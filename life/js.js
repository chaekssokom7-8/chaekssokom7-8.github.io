var canvas = document.getElementById('c1');
var ctx = canvas.getContext('2d');
var mas=[];
var count=0;
var timer;

canvas.onclick = function(event){
	var x = event.offsetX;
	var y = event.offsetY;
	console.log(x);
	console.log(y);
	x = Math.floor(x/10); 
	y = Math.floor(y/10); 
	if(mas[y][x]==1){mas[y][x]=0}
	else{mas[y][x]=1}
	console.log(mas);
	drawField();
}

function goLife(){
	var n=60, m=60;
	for (var i=0; i<m; i++){
		mas[i]=[];
		for (var j=0; j<n; j++){
			mas[i][j]=0;
		}
	}
}
goLife();

function drawField(){
	ctx.clearRect(0, 0, 600, 600);
	for (var i=0; i<60; i++){
		for (var j=0; j<60; j++){
			if (mas[i][j]==1){
				ctx.fillRect(j*10, i*10, 10, 10);
			}
		}
	}
}

function startLife(){
	//моделирование жизни
	var mas2 = [];
	for (var i=0; i<60; i++){
		mas2[i]=[];
		for (var j=0; j<60; j++){
			var neighbors = 0;
			if (mas[fpm(i)-1][j]==1) neighbors++;//up
			if (mas[i][fpp(j)+1]==1) neighbors++;//right
			if (mas[fpp(i)+1][j]==1) neighbors++;//bottom
			if (mas[i][fpm(j)-1]==1) neighbors++;//left
			if (mas[fpm(i)-1][fpp(j)+1]==1) neighbors++;
			if (mas[fpp(i)+1][fpp(j)+1]==1) neighbors++;
			if (mas[fpp(i)+1][fpm(j)-1]==1) neighbors++;
			if (mas[fpm(i)-1][fpm(j)-1]==1) neighbors++;
			(neighbors==2 || neighbors==3) ? mas2[i][j]=1 : mas2[i][j]==0;
		}
	}
	mas = mas2;
	drawField();
	count++;
	document.getElementById('count').innerHTML = count;
	timer = setTimeout(startLife, 300);
}

function fpm(i){
	if(i==0) return 60;
	else return i;
}
function fpp(i){
	if(i==59) return -1;
	else return i;
}

document.getElementById('start').onclick = startLife;