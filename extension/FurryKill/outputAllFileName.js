var fs = require('fs');
var path = require('path');//解析需要遍历的文件夹
var filePath = path.resolve('');
var srcPath = path.resolve(__dirname, '..');
var count = 0; //总共读取到的文件数
var outFilePath = './outputAllFileName.txt';
var excludeFile = ["输出所有文件名.js","生成所有文件名.bat","outputAllFileName.txt"];

//删除文件
fs.unlinkSync(outFilePath);
console.log('删除文件成功');

//调用文件遍历方法
fileDisplay(filePath);
//文件遍历方法
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror, stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            count++;
                            let printContent = `"${filedir.replace(srcPath+"\\","")}",`;
                            printContent = printContent.replace(/\\/g,"/");
                            if(count % 6 == 0) {
                                printContent += "\n";
                            }
                            // console.log(printContent);
　　　　　　　　　　　　　　　 // 读取文件内容
                            // var content = fs.readFileSync(filedir, 'utf-8');
                            // console.log(content);
                            // 过滤不需要的文件：
                            if(excludeFile.includes(filename)) return;
                            //打印到文件里
                            fs.writeFile(outFilePath, printContent, { 'flag': 'a' }, function(err) {
                                if (err) {
                                    console.log(printContent,"输出错误");
                                    throw err;
                                }                                                       
                                // 写入成功后读取测试
                                fs.readFile(outFilePath, 'utf-8', function(err, data) {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log(data);
                                });
                            });
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}