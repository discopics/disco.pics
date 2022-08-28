import { Client, Entity, Schema, EntityData } from "redis-om";

const client = new Client();

let clientOpen = false;
async function connect() {
  if (clientOpen) {
    return;
  }
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
    clientOpen = true;
  }
}

class Image extends Entity {}
const schema = new Schema(Image, {
  uploaded_by: { type: "string", indexed: true },
  slug: { type: "text", indexed: true },
  img_url: { type: "string" },
  uploaded_at: { type: "date" },
});

class User extends Entity {}
const userSchema = new Schema(
  User,
  {
    id: { type: "string", indexed: true },
    email: { type: "string" },
    created_at: { type: "date" },
    token_number: { type: "number" },
    embed_title: { type: "string" },
    embed_site_name: { type: "string" },
    embed_site_url: { type: "string" },
    embed_colour: { type: "string" },
    embed_author_name: { type: "string" },
    embed_desc: { type: "string" },
  },
  {
    dataStructure: "JSON",
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createIndex() {
  await connect();

  const imageRepository = client.fetchRepository(schema);
  imageRepository.createIndex();
  const userRepository = client.fetchRepository(userSchema);
  userRepository.createIndex();
  console.log("Index created");
}

export async function searchRedis(q: string) {
  await connect();
  const imageRepository = client.fetchRepository(schema);
  const images = await imageRepository
    .search()
    .where("slug")
    .matches(q)
    .return.all();
  return images;
}

export async function checkIfSlugExists(slug: string) {
  await connect();
  const imageRepository = client.fetchRepository(schema);
  const result = await imageRepository
    .search()
    .where("slug")
    .equals(slug)
    .all();
  return result.length > 0;
}

export async function updateUserEmbedSettings(
  id: string,
  embed_title: string,
  embed_site_name: string,
  embed_site_url: string,
  embed_colour: string,
  embed_author_name: string,
  embed_desc: string
) {
  await connect();

  const userRepository = client.fetchRepository(userSchema);
  const user = await userRepository.search().where("id").equals(id).all();
  if (user.length === 0) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userEntity: any = await userRepository.fetch(user[0]?.entityId);

  userEntity.embed_title = embed_title != undefined ? embed_title : null;
  userEntity.embed_site_name =
    embed_site_name != undefined ? embed_site_name : null;
  userEntity.embed_site_url =
    embed_site_url != undefined ? embed_site_url : null;
  userEntity.embed_colour = embed_colour != undefined ? embed_colour : null;
  userEntity.embed_author_name =
    embed_author_name != undefined ? embed_author_name : null;
  userEntity.embed_desc = embed_desc != undefined ? embed_desc : null;

  await userRepository.save(userEntity);

  return userEntity;
}

export async function deleteImage(slug: string) {
  await connect();
  const imageRepository = client.fetchRepository(schema);
  const result = await imageRepository
    .search()
    .where("slug")
    .equals(slug)
    .first();

  if (result) {
    await imageRepository.remove(result.entityId);
  }

  return result?.toJSON();
}

export async function getUser(id: string) {
  await connect();
  const userRepository = client.fetchRepository(userSchema);
  const user = await userRepository.search().where("id").equals(id).first();
  return user;
}

export async function createUser(user: EntityData) {
  await connect();
  const userRepository = client.fetchRepository(userSchema);
  const newUser = await userRepository.createEntity(user);

  await userRepository.save(newUser);
  return newUser;
}

export async function createImage(data: EntityData) {
  await connect();
  const repository = client.fetchRepository(schema);

  const image = repository.createEntity(data);

  const id = await repository.save(image);
  return id;
}

export async function getAllImagesByUser(userId: string) {
  await connect();
  const repository = client.fetchRepository(schema);

  const images = await repository
    .search()
    .where("uploaded_by")
    .eq(userId)
    .all();
  return images;
}

export async function getImage(slug: string) {
  await connect();
  const repository = client.fetchRepository(schema);

  const image = await repository.search().where("slug").eq(slug).first();
  return image;
}
