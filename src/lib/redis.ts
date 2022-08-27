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
  slug: { type: "string", indexed: true },
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
    token_number: { type: "number" }, // Last token regenned
  },
  {
    dataStructure: "JSON",
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function createIndex() {
  await connect();

  const imageRepository = client.fetchRepository(schema);
  imageRepository.createIndex();
  const userRepository = client.fetchRepository(userSchema);
  userRepository.createIndex();
  console.log("Index created");
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
