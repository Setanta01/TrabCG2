🌲 Passeio Virtual: Floresta Simulada
Uma experiência interativa de exploração em primeira pessoa por uma floresta procedural, construída inteiramente com WebGL nativo.

📖 Descrição do Passeio Virtual
Este projeto simula um passeio imersivo por uma floresta densa durante um ciclo dinâmico de dia e noite. Ao entrar na cena, o usuário se encontra no meio de um vasto campo verdejante, repleto de árvores, flores flutuantes e girassóis.

O grande diferencial deste passeio é a sensação de um "mundo infinito": à medida que o usuário caminha, a floresta parece não ter fim, graças a um sistema matemático de reposicionamento de objetos (wrapping) que acompanha a câmera. O visitante pode observar a transição suave entre a luz dourada do dia e o luar prateado da noite, notando como a natureza ao redor reage — como os girassóis que acompanham o sol durante o dia e "murcham" apontando para baixo durante a noite.

✨ Funcionalidades Principais
Sistema de Câmera em Primeira Pessoa: Controle fluido com suporte ao Pointer Lock API do navegador para captura do mouse.
Ciclo Dia/Noite Automático: Órbita de um Sol e de uma Lua, alterando em tempo real as cores do céu, a direção da luz e a intensidade da iluminação.
Mundo Procedural "Infinito": O cenário usa um algoritmo de modulo contínuo (wrapCoord e wrapDelta) que faz as árvores e flores aparecerem sempre ao redor do jogador, criando a ilusão de uma floresta sem limites.
Iluminação Phong Realista: Cálculo de luz Ambiente, Difusa e Especular nos shaders para dar volume e realismo às folhas, troncos e pétalas.
Efeito de Neblina (Fog): Integrado ao fragment shader para mesclar os objetos distantes com a cor do céu, evitando que os objetos surjam abruptamente e dando profundidade à cena.
Comportamento Botânico:
Girassóis calculam vetores de direção (look-at) para o Sol, acompanhando seu movimento.
Flores menores flutuam, giram e "pulsam" suavemente usando funções trigonométricas de seno/cosseno.
Geração Matemática de Geometrias: Nenhuma模型o 3D externa (como .obj) foi usada. Todos os cilindros, cones, esferas, pétalas e o plano do chão foram gerados via código JavaScript.
🎮 Controles
Tecla / Ação
Efeito
Clique na tela	Trava o cursor do mouse (Pointer Lock) para olhar ao redor
Mouse	Movimenta a câmera para cima, baixo, esquerda e direita
W	Move para frente
S	Move para trás
A	Move para a esquerda
D	Move para a direita

🛠️ Tecnologias Utilizadas
WebGL: Para renderização gráfica acelerada por GPU diretamente no navegador.
GLSL: Linguagem de shading usada para os Vertex e Fragment Shaders (iluminação e neblina).
Math.js: Biblioteca externa utilizada para facilitar os cálculos de álgebra linear (matrizes de transformação, translação, rotação, perspectiva e produto vetorial/cruzado).
JavaScript ES6: Lógica da aplicação, criação de buffers e loop de renderização.

🚀 Como Executar
Como o projeto faz o carregamento de duas texturas externas (log.jpg para os troncos e leaves.jpg para as folhas), é recomendado rodar o projeto através de um servidor local para evitar problemas com a política de CORS dos navegadores.

Certifique-se de que os arquivos index.html, lib.js, log.jpg e leaves.jpg estejam na mesma pasta.
Inicie um servidor local (Exemplo abaixo):
Usando Python: Abra o terminal na pasta e digite python -m http.server 8000
Abra seu navegador e acesse http://localhost:8000 (ou a porta correspondente).
Clique na tela para começar a olhar ao redor e use WASD para caminhar pela floresta.
