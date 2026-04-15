import fs from "fs";

function arg(n) {
  const i = process.argv.indexOf(`--${n}`);
  return i >= 0 ? process.argv[i + 1] : "";
}

const acao = arg("acao");
const id = arg("id");
const titulo = arg("titulo");
const descricao = arg("descricao");
const valor = arg("valor");

let dados = { servicos: [] };

if (fs.existsSync("servicos.json")) {
  dados = JSON.parse(fs.readFileSync("servicos.json", "utf-8"));
}

if (acao === "criar") {
  dados.servicos.push({
    id: Date.now(),
    titulo,
    descricao,
    valor,
    status: "disponivel"
  });
}

if (acao === "aceitar") {
  const s = dados.servicos.find(x => x.id === Number(id));
  if (s) s.status = "aceito";
}

fs.writeFileSync("servicos.json", JSON.stringify(dados, null, 2));
