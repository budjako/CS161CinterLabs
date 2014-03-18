//START OF FUNCTION FOR DRAWCUBE
function drawCube(gl,program,canvas,cubesize,positionX,positionY,positionZ,imagesrc,red,green,blue){
	//Start of vertices
		var vertices=new Float32Array([
			cubesize+positionX,cubesize+positionY,cubesize+positionZ,
			-cubesize+positionX,cubesize+positionY,cubesize+positionZ,
			-cubesize+positionX,-cubesize+positionY,cubesize+positionZ,
			cubesize+positionX,-cubesize+positionY,cubesize+positionZ,		//front

			cubesize+positionX,cubesize+positionY,cubesize+positionZ,
			cubesize+positionX,-cubesize+positionY,cubesize+positionZ,
			cubesize+positionX,-cubesize+positionY,-cubesize+positionZ,
			cubesize+positionX,cubesize+positionY,-cubesize+positionZ,		//right

			cubesize+positionX,cubesize+positionY,cubesize+positionZ,
			cubesize+positionX,cubesize+positionY,-cubesize+positionZ,
			-cubesize+positionX,cubesize+positionY,-cubesize+positionZ,
			-cubesize+positionX,cubesize+positionY,cubesize+positionZ,		//up

			-cubesize+positionX,cubesize+positionY,cubesize+positionZ,
			-cubesize+positionX,cubesize+positionY,-cubesize+positionZ,
			-cubesize+positionX,-cubesize+positionY,-cubesize+positionZ,
			-cubesize+positionX,-cubesize+positionY,cubesize+positionZ,		//left

			-cubesize+positionX,-cubesize+positionY,-cubesize+positionZ,
			cubesize+positionX,-cubesize+positionY,-cubesize+positionZ,
			cubesize+positionX,-cubesize+positionY,cubesize+positionZ,
			-cubesize+positionX,-cubesize+positionY,cubesize+positionZ,		//down

			cubesize+positionX,-cubesize+positionY,-cubesize+positionZ,
			-cubesize+positionX,-cubesize+positionY,-cubesize+positionZ,
			-cubesize+positionX,cubesize+positionY,-cubesize+positionZ,
			cubesize+positionX,cubesize+positionY,-cubesize+positionZ		//back
			]);

		//buffer for cube vertices
		var cubeVerticesBuffer = gl.createBuffer();
		  	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesBuffer);
		  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		  	var aPosition = gl.getAttribLocation(program,"aPosition");
		  	gl.vertexAttribPointer(aPosition,3,gl.FLOAT,false,0,0);
		  	gl.enableVertexAttribArray(aPosition);
		  	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	//End of vertices

	//Start of indices
		var indices = [
			 0, 1, 2,   0, 2, 3,    // front
			 4, 5, 6,   4, 6, 7,    // right
			 8, 9,10,   8,10,11,    // up
			12,13,14,  12,14,15,    // left
			16,17,18,  16,18,19,    // down
			20,21,22,  20,22,23     // back
			];
		
		//buffer creation
		  	var indexBuffer = gl.createBuffer();
		  	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		  	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		  	//unbind buffer to gl.ELEMENT_ARRAY_BUFFER POINTER
		  	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	//End of indices

	//set color
			var uColor = gl.getUniformLocation(program,"uColor");
			gl.uniform4f(uColor,red,green,blue,1);

	//set-up model matrix, view matrix, and projection matrix
		  	var modelMatrix = mat4.create();
		  	var uModel = gl.getUniformLocation(program,"uModel");
		  	gl.uniformMatrix4fv(uModel,false,modelMatrix);

		  	var viewMatrix = mat4.create();
		  	var uView = gl.getUniformLocation(program,"uView");
		  	mat4.lookAt(viewMatrix,[3,3,7],[0,0,0],[0,1,0]);
		  	gl.uniformMatrix4fv(uView,false,viewMatrix);

		  	var projectionMatrix = mat4.create();
		  	var uProjection = gl.getUniformLocation(program,"uProjection");
		  	mat4.perspective(projectionMatrix,glMatrix.toRadian(30),canvas.width/canvas.height,1,100);
		  	gl.uniformMatrix4fv(uProjection,false,projectionMatrix);

			modelMatrix = mat4.identity(modelMatrix);
			mat4.rotateX(modelMatrix,modelMatrix,glMatrix.toRadian(0));
			mat4.rotateY(modelMatrix,modelMatrix,glMatrix.toRadian(0));
			gl.uniformMatrix4fv(uModel,false,modelMatrix);
			projectionMatrix = mat4.create();
			mat4.perspective(projectionMatrix,glMatrix.toRadian(30),canvas.width/canvas.height,1,100);
			
			// gl.clearColor(0.0,0.0,0.0,1.0);
			// gl.clear(gl.COLOR_BUFFER_BIT);
			gl.enable(gl.DEPTH_TEST);
			gl.viewport(0,0,canvas.width,canvas.height);
			// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
			gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
	}
//END OF FUNCTION FOR DRAWCUBE