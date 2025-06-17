let stage = 1; // 1 = colheita, 2 = exibição, 3 = vendas
let corns = [];
let products = [];
let selectedProduct = null;
let stock = 10;
let price = 5.00;
let totalSold = 0;
let backButton;

function setup() {
  createCanvas(800, 600);
  textFont('Georgia');

  for (let i = 0; i < 10; i++) {
    corns.push({ x: 50 + i * 70, y: 350, harvested: false });
  }

  products = [
    { name: "Bolo de Milho", x: 100 },
    { name: "Pipoca", x: 300 },
    { name: "Canjica", x: 500 }
  ];

  backButton = createButton("Voltar");
  backButton.position(20, 20);
  backButton.mousePressed(goBack);
  backButton.hide();
}

function draw() {
  background(245, 223, 178);

  if (stage === 1) {
    drawHarvest();
  } else if (stage === 2) {
    drawProducts();
  } else if (stage === 3) {
    drawShop();
  }
}

function drawHarvest() {
  backButton.hide();
  fill(50, 150, 50);
  rect(0, 400, width, 200);

  fill(0);
  textSize(24);
  textAlign(CENTER);
  text("Clique nas espigas para colher o milho!", width / 2, 50);

  for (let corn of corns) {
    if (!corn.harvested) {
      drawCorn(corn.x, corn.y);
    } else {
      fill(255);
      ellipse(corn.x, corn.y + 30, 10);
    }
  }

  if (corns.some(c => c.harvested)) { // <-- linha alterada
    textSize(18);
    text("Pressione ENTER para continuar...", width / 2, height - 40); // <-- linha alterada
  }
}

function drawCorn(x, y) {
  textSize(32); // Tamanho grande para o emoji
  textAlign(CENTER, CENTER);
  text("🍓", x, y); // Exibe o emoji no lugar do desenho
}

function drawProducts() {
  backButton.hide();
  textSize(24);
  fill(0);
  textAlign(CENTER);
  text("Produtos feitos com milho!", width / 2, 50);

  textSize(18);
  for (let p of products) {
    fill("blue");
    rect(p.x, 200, 100, 100, 10);
    fill(0);
    textAlign(CENTER);
    text(p.name, p.x + 50, 320);
   
  }

  textSize(16);
  text("Clique em um produto para ir para a venda.", width / 2, height - 40);
}

function drawShop() {
  background(255, 250, 200);
  backButton.show();

  textAlign(CENTER);
  fill(0);
  textSize(24);
  text(`Vendinha: ${selectedProduct}`, width / 2, 50);

  fill(255, 255, 153);
  rect(width / 2 - 50, 120, 100, 100, 10);
  fill(0);
  textSize(18);
  text("Comprar", width / 2, 250);

  textSize(16);
  text(`Estoque: ${stock}`, width / 2, 300);
  text(`Valor: R$${price.toFixed(2)}`, width / 2, 330);
  text(`Total vendido: R$${totalSold.toFixed(2)}`, width / 2, 360);
}

function mousePressed() {
  if (stage === 1) {
    for (let corn of corns) {
      if (!corn.harvested && dist(mouseX, mouseY, corn.x, corn.y) < 20) {
        corn.harvested = true;
        break;
      }
    }
  } else if (stage === 2) {
    for (let p of products) {
      if (mouseX > p.x && mouseX < p.x + 100 && mouseY > 200 && mouseY < 300) {
        selectedProduct = p.name;
        stage = 3;
      }
    }
  } else if (stage === 3) {
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > 120 && mouseY < 220) {
      if (stock > 0) {
        stock--;
        totalSold += price;
      } else {
        alert("Produto esgotado!");
      }
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER && stage === 1 && corns.some(c => c.harvested)) { // <-- linha alterada
    stage = 2;
  }
}

function goBack() {
  stage = 2;
  selectedProduct = null;
  backButton.hide();
}
