const { normalize, schema, denormalize } = require("normalizr");
const originalData = {
  id: "999",
  posts: [
    {
      id: "100",
      author: {
        id: "1",
        nombre: "Fernando",
        apellido: "Monaco",
        edad: "39",
        alias: "Fer",
        avatar: "",
      },
      title: "",
      comments: [
        {
          id: "101",
          commenter: {
            id: "2",
            nombre: "Belen",
            apellido: "Obregon",
            edad: "31",
            alias: "Belu",
            avatar: "",
          },
        },
        {
          id: "102",
          commenter: {
            id: "3",
            nombre: "Pedro",
            apellido: "Perez",
            edad: "22",
            alias: "Pedri",
            avatar: "",
          },
        },
      ],
    },
    {
      id: "103",
      author: {
        id: "2",
        nombre: "German",
        apellido: "Monaco",
        edad: "38",
        alias: "Ger",
        avatar: "",
      },
      title: "",
      comments: [
        {
          id: "104",
          commenter: {
            id: "1",
            nombre: "Pamela",
            apellido: "Monaco",
            edad: "27",
            alias: "Pame",
            avatar: "",
          },
        },
        {
          id: "105",
          commenter: {
            id: "3",
            nombre: "Susana",
            apellido: "Gerli",
            edad: "60",
            alias: "Su",
            avatar: "",
          },
        },
      ],
    },
    {
      id: "106",
      author: {
        id: "3",
        nombre: "Raul",
        apellido: "Monaco",
        edad: "61",
        alias: "Raul",
        avatar: "",
      },
      title: "",
      comments: [
        {
          id: "107",
          commenter: {
            id: "2",
            nombre: "Juan",
            apellido: "Obregon",
            edad: "33",
            alias: "Juancho",
            avatar: "",
          },
        },
        {
          id: "108",
          commenter: {
            id: "1",
            nombre: "Pablo",
            apellido: "Perez",
            edad: "Pablo",
            alias: "40",
            avatar: "",
          },
        },
      ],
    },
  ],
};

const user = new schema.Entity("users");
const comment = new schema.Entity("comments", {
  commenter: user,
});
const post = new schema.Entity("posts", {
  author: user,
  comments: [comment],
});
const articles = new schema.Entity("articles", {
  posts: [post],
});
const dataNormalizada = normalize(originalData, articles);
console.log("Datos normalizados: ", dataNormalizada);

const util = require("util");

function printData(data) {
  console.log(util.inspect(data, false, 12, true));
}
printData(dataNormalizada);

console.log(
  JSON.stringify(originalData).length,
  JSON.stringify(dataNormalizada).length
);

const dataOriginal = denormalize(
  dataNormalizada.result,
  articles,
  dataNormalizada.entities
);
printData(dataOriginal);

function porcentaje(uno, dos) {
  const porcentajes = Math.round(100 - (uno * 100) / dos);
  console.log("porcentaje de compresión del proceso de normalización: " ,porcentajes, "%");
}
porcentaje(
  parseInt(JSON.stringify(dataNormalizada).length),
  parseInt(JSON.stringify(originalData).length)
);
