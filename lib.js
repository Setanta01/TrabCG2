function getGL(canvas)  // inicializar o gl que nem na aula
{
    var gl = canvas.getContext("webgl");
    if(gl) return gl;

    gl = canvas.getContext("experimental-webgl");
    if(gl) return gl;

    alert("Contexto WebGL inexistente! Troque de navegador!");
    return false;
}

function resizeCanvasToWindow(canvas)
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createShader(gl, shaderType, shaderSrc) //funcao para criar/inicializar shader demonstrada em aula
{
	var shader = gl.createShader(shaderType);
	gl.shaderSource(shader, shaderSrc);
	gl.compileShader(shader);

	if(gl.getShaderParameter(shader, gl.COMPILE_STATUS))
		return shader;

	alert("Erro de compilação: " + gl.getShaderInfoLog(shader));

	gl.deleteShader(shader);
}

function createProgram(gl, vtxShader, fragShader) //função para inicializar o programa 
{
	var prog = gl.createProgram();
	gl.attachShader(prog, vtxShader);
	gl.attachShader(prog, fragShader);
	gl.linkProgram(prog);

	if(gl.getProgramParameter(prog, gl.LINK_STATUS))
		return prog;

    alert("Erro de linkagem: " + gl.getProgramInfoLog(prog));

	gl.deleteProgram(prog);
}

function createRotationZ(angle)
{
    var rad = angle * Math.PI / 180.0;
    return math.matrix([
        [Math.cos(rad), -Math.sin(rad), 0.0, 0.0],
        [Math.sin(rad),  Math.cos(rad), 0.0, 0.0],
        [0.0,             0.0,          1.0, 0.0],
        [0.0,             0.0,          0.0, 1.0]
    ]);
}

function createRotationY(angle)
{
    var rad = angle * Math.PI / 180.0;
    return math.matrix([
        [ Math.cos(rad), 0.0, -Math.sin(rad), 0.0],
        [ 0.0,           1.0,  0.0,           0.0],
        [ Math.sin(rad), 0.0,  Math.cos(rad), 0.0],
        [ 0.0,           0.0,  0.0,           1.0]
    ]);
}

function createRotationX(angle)
{
    var rad = angle * Math.PI / 180.0;
    return math.matrix([
        [1.0, 0.0,            0.0,           0.0],
        [0.0, Math.cos(rad), -Math.sin(rad), 0.0],
        [0.0, Math.sin(rad),  Math.cos(rad), 0.0],
        [0.0, 0.0,            0.0,           1.0]
    ]);
}


function createTexture(gl, image, textureUnit) //função para criar textura
{
    var tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + textureUnit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    return tex;
}


function loadTexture(gl, url, textureUnit, onLoad) //carregar textura de um arquivo
{
    var image = new Image();
    image.onload = function()
    {
        var tex = createTexture(gl, image, textureUnit);
        if(onLoad) onLoad(tex, image);
    };
    image.src = url;
    return image;
}

function createBuffer(gl, data)
{
    var bufPtr = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufPtr);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return bufPtr;
}

function createTranslation(tx, ty, tz)
{
    return math.matrix([
        [1.0, 0.0, 0.0, tx],
        [0.0, 1.0, 0.0, ty],
        [0.0, 0.0, 1.0, tz],
        [0.0, 0.0, 0.0, 1.0]
    ]);
}

function createPerspective(fovy, aspect, near, far) //metodo usado na sala de aula para criar uma perspectiva de distancia
{
    fovy = fovy * Math.PI / 180.0;

    var fy = 1 / math.tan(fovy / 2.0);
    var fx = fy / aspect;
    var B = -2 * far * near / (far - near);
    var A = -(far + near) / (far - near);

	var proj = math.matrix([
		[ fx, 0.0,  0.0, 0.0],
		[0.0,  fy,  0.0, 0.0],
		[0.0, 0.0,    A,   B],
		[0.0, 0.0, -1.0, 0.0]
	]);

	return proj;
}

function camera(pos, y, p) {   //função de camera que eu achei em fórum baseada em angulo, pq a que tinha no classroom bugava
    let radY = y * Math.PI / 180.0;
    let radP = p * Math.PI / 180.0;
        
    let front = [
        Math.cos(radY) * Math.cos(radP),
        Math.sin(radP),
        Math.sin(radY) * Math.cos(radP)
    ];
    
    let worldUp = [0, 1, 0];
    let right = math.cross(front, worldUp);
    right = math.divide(right, math.norm(right));
    let up = math.cross(right, front);
    up = math.divide(up, math.norm(up));

    let rot = math.matrix([
        [right[0], right[1], right[2], 0],
        [up[0],    up[1],    up[2],    0],
        [-front[0], -front[1], -front[2], 0],
        [0,         0,         0,         1]
    ]);
    let trans = createTranslation(-pos[0], -pos[1], -pos[2]);
    return math.multiply(rot, trans);
}

function createScale(sx, sy, sz) {
    return math.matrix([
        [sx, 0, 0, 0],
        [0, sy, 0, 0],
        [0, 0, sz, 0],
        [0, 0, 0, 1]
    ]);
}


function computeBasisFromFront(front) {       //para calcular pra onde o vetor aponta   
    let flen = math.norm(front);
    let f = flen > 0.0001 ? math.divide(front, flen) : [0, 1, 0];

    let worldUp = Math.abs(f[1]) > 0.98 ? [0, 0, 1] : [0, 1, 0];

    let right = math.cross(f, worldUp);
    right = math.divide(right, math.norm(right));
    let up = math.cross(right, f);
    up = math.divide(up, math.norm(up));

    return { right, up, front: f };
}


function createOrientedMatrix(pos, basis) {
    return math.matrix([
        [basis.right[0], basis.up[0], basis.front[0], pos[0]],
        [basis.right[1], basis.up[1], basis.front[1], pos[1]],
        [basis.right[2], basis.up[2], basis.front[2], pos[2]],
        [0, 0, 0, 1]
    ]);
}

function sendMatrixUniform(gl, prog, uniformName, mathMatrix){
    var flat = math.flatten(math.transpose(mathMatrix))._data;
    var ptr = gl.getUniformLocation(prog, uniformName);
    gl.uniformMatrix4fv(ptr, false, flat);
    return ptr;
}

function startRenderLoop(gl, canvas, resLoc, timeLoc, onFrame){
    function render(time)
    {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);

        if(resLoc) gl.uniform2f(resLoc, canvas.width, canvas.height);
        if(timeLoc) gl.uniform1f(timeLoc, time * 0.001);

        if(onFrame) onFrame(time);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}