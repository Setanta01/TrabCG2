# 🌲 Passeio Virtual: Floresta Simulada

Uma experiência interativa de exploração em primeira pessoa por uma floresta procedural, construída inteiramente com **WebGL nativo**.
Link Slide:https://docs.google.com/presentation/d/e/2PACX-1vQiQkPgOIjT75zq9i5E-YAh3SzRrhvU2UMNoijohrq2JaJVzsk8m6vO0mrJNTzHJM9HDe5gUCyBz_FW/pub?start=false&loop=false&delayms=60000
Link Video:
No checklist.txt possui todas os requisitos do trabalho e um exemplo de como eles foram devidamente preenchidos.

---

# 📖 Descrição

Este projeto simula um passeio imersivo por uma floresta densa durante um ciclo dinâmico de **dia e noite**.

Ao entrar na cena, o usuário se encontra no meio de um vasto campo verdejante, repleto de árvores, flores flutuantes e girassóis.

O grande diferencial deste passeio é a sensação de um **"mundo infinito"**. À medida que o usuário caminha, a floresta parece não ter fim graças a um sistema matemático de reposicionamento de objetos (**wrapping**) que acompanha a câmera.

Durante a exploração, é possível observar a transição suave entre a luz dourada do dia e o luar prateado da noite, percebendo como a natureza reage ao ambiente. Os girassóis acompanham o Sol durante o dia e "murcham", apontando para baixo, durante a noite.

---

# ✨ Funcionalidades

- 🎥 **Sistema de câmera em primeira pessoa**
  - Controle fluido utilizando a **Pointer Lock API** para captura do mouse.

- 🌞 **Ciclo automático de dia e noite**
  - Órbita dinâmica do Sol e da Lua.
  - Alteração em tempo real das cores do céu.
  - Mudança da direção e intensidade da iluminação.

- 🌳 **Mundo procedural "infinito"**
  - Algoritmo de *wrapping* (`wrapCoord` e `wrapDelta`) que mantém árvores e flores sempre ao redor do jogador, criando a ilusão de uma floresta sem limites.

- 💡 **Iluminação Phong**
  - Cálculo de iluminação ambiente, difusa e especular diretamente nos shaders, proporcionando maior realismo às folhas, troncos e pétalas.

- 🌫️ **Efeito de neblina (Fog)**
  - Implementado no *Fragment Shader* para suavizar objetos distantes e aumentar a sensação de profundidade.

- 🌻 **Comportamento botânico**
  - Girassóis utilizam vetores do tipo *look-at* para acompanhar a posição do Sol.
  - Durante a noite, apontam naturalmente para baixo.

- 🌸 **Animação procedural das flores**
  - Flores menores flutuam, giram e apresentam um movimento de pulsação utilizando funções trigonométricas (`seno` e `cosseno`).

- 🔺 **Geometrias geradas por código**
  - Nenhum modelo 3D externo foi utilizado.
  - Cilindros, cones, esferas, pétalas e o plano do chão são gerados inteiramente via JavaScript.

---

# 🎮 Controles

| Ação | Efeito |
|------|--------|
| Clique na tela | Ativa o **Pointer Lock** |
| Mouse | Controla a direção da câmera |
| **W** | Andar para frente |
| **S** | Andar para trás |
| **A** | Mover para a esquerda |
| **D** | Mover para a direita |

---

# 🛠️ Tecnologias Utilizadas

- **WebGL**
  - Renderização gráfica acelerada por GPU diretamente no navegador.

- **GLSL**
  - Linguagem utilizada nos *Vertex Shaders* e *Fragment Shaders* para iluminação e neblina.

- **Math.js**
  - Biblioteca utilizada para operações de álgebra linear, incluindo:
    - Matrizes de transformação;
    - Rotação;
    - Translação;
    - Projeção em perspectiva;
    - Produto vetorial.

- **JavaScript ES6**
  - Responsável pela lógica da aplicação, criação das geometrias, buffers e loop de renderização.

---

# 🚀 Como Executar

Como o projeto utiliza duas texturas externas (`log.jpg` e `leaves.jpg`), recomenda-se executá-lo através de um **servidor local** para evitar problemas relacionados à política de CORS dos navegadores.

## 1. Estrutura dos arquivos

Certifique-se de que os seguintes arquivos estejam na mesma pasta:

```text
.
├── index.html
├── lib.js
├── log.jpg
└── leaves.jpg
```

## 2. Inicie um servidor local

### Usando Python

Abra o terminal na pasta do projeto e execute:

```bash
python -m http.server 8000
```

## 3. Abra no navegador

Acesse:

```text
http://localhost:8000
```

## 4. Explore a floresta

- Clique na tela para ativar o controle da câmera.
- Utilize **WASD** para caminhar.
- Movimente o mouse para olhar ao redor.

---

# 📌 Destaques Técnicos

- 🌲 Floresta procedural com efeito de mundo infinito.
- 🌞 Ciclo completo de dia e noite.
- 💡 Iluminação Phong em GLSL.
- 🌫️ Neblina integrada aos shaders.
- 🌻 Girassóis que seguem o Sol dinamicamente.
- 🌸 Flores com animações procedurais.
- 🔺 Geometrias totalmente geradas por código, sem modelos 3D externos.
