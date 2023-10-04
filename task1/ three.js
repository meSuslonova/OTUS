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
        result += prefix + (lastNode ? '└──' : '├──') + ' ' + e.name + '\n';
        if (e.items)
          result += buildTree(e.items, prefix + (lastNode ? ' ' : '│') + ' ');
    
      });
      return result;
    }
console.log(buildTree(obj));
