import fs from "fs";

function arg(nome) {
  const i = process.argv.indexOf(`--${nome}`);
  return i >= 0 ? process.argv[i + 1] : "";
}

const acao = arg("acao");
const id = arg("id");
const titulo = arg("titulo");
const descricao = arg("descricao");
const valor = arg("valor");

let dados = { servicos: [] };

if (fs.existsSync("servicos.json")) {
  dados = JSON.parse(fs.readFileSync("servicos.json", "utf8"));
}

if (!Array.isArray(dados.servicos)) dados.servicos = [];

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
  const servico = dados.servicos.find(s => s.id === Number(id));
  if (servico) servico.status = "aceito";
}

fs.writeFileSync("servicos.json", JSON.stringify(dados, null, 2));
