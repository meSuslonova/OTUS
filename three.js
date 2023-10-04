
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
body {
  font-family: monospace;
  white-space: pre;
}
</style>
</head>
<body>
<script>
var obj= [{
name: 1,
items: [
		{name: 2,
		items: [{ name: 3 }, { name: 4 }]},
{name: 5,
items: []}, 
{name: 6,
items: []},
]
}];

function buildTree(tree, prefix) {
  if (typeof prefix === 'undefined')
    prefix = '';
  var result = '';
  tree.forEach(function(e, i) {
    var lastNode = i == tree.length -1;
    result += prefix + (lastNode ? 'L--' : '+--') + ' ' + e.name + '\n';
    if (e.items)
      result += buildTree(e.items, prefix + (lastNode ? ' ' : '�') + ' ');

  });
  return result;
}

document.body.innerHTML = buildTree(obj).split('\n').join('<br/>');

</script>
</body>
</html>