/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { env } from "../env/server.mjs";

const chars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-1234567890`;
const HASH_NUMBER = parseInt(env.HASH_NUMBER);
const shuffled = shuffle(chars.split(""), HASH_NUMBER);

function random(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function shuffle(array: string[], seed: number) {
  let m = array.length,
    t,
    i;

  while (m) {
    i = Math.floor(random(seed) * m--);

    t = array[m];
    array[m] = array[i]!;
    array[i] = t!;
    ++seed;
  }

  return array;
}

const cipher = (text: string) => {
  let returned_text = "";

  for (let i = 0; i < text.length; i++) {
    returned_text += shuffled[chars.indexOf(text[i]!)];
  }

  return extend(returned_text);
};

const decipher = (text: string) => {
  let returned_text = "";
  const index = Math.floor(random(HASH_NUMBER) * (text.length / 2));

  for (let i = 0; i < text.length; i++) {
    returned_text += chars[shuffled.indexOf(text[i]!)];
  }
  const total = parseInt(text[index]!);
  const str = parseInt(text.slice(index + 1, index + total + 1));
  return returned_text.slice(text.length - str);
};

const extend = (text: string, length = 60) => {
  const extra = length - text.length;

  if (extra < 0) {
    return text;
  }

  // Random index to store the length of the string
  const index = Math.floor(random(HASH_NUMBER) * (length / 2));

  const storage_string =
    text.length.toString().length.toString() + text.length.toString();
  let returned = "";
  let total = storage_string.length + text.length;

  for (let i = 0; i < extra; i++) {
    if (i == index) {
      returned += storage_string;
    } else {
      if (total >= length) {
        break;
      }

      // Add a random character
      returned +=
        shuffled[
          Math.floor(random(random(i) + random(HASH_NUMBER)) * shuffled.length)
        ];
      total++;
    }
  }
  returned += text;
  return returned;
};

export { cipher, decipher };
