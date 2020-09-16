let num = 266219;
num = `${num}`;
let numArr = [];
for (let i = 0; i < num.length; i++) {
	numArr[i] = num.substring(i, i + 1);
}
num = numArr.reduce((a, b) => {
	return a * b;
});
console.log(num);
