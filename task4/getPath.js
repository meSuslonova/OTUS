function getPath(element) {
    const path = [];

    while (element !== document.body && element !== document.documentElement) {
        let selector;

        if (element.id) {
            selector = `#${element.id}`;
        } else {
            const tagName = element.tagName.toLowerCase();
            const siblings = Array.from(element.parentNode.children);
            const index = siblings.indexOf(element) + 1;

            selector = `${tagName}:nth-child(${index})`;
        }

        path.unshift(selector);
        element = element.parentNode;
    }

    return path.join(' ');
}

const element = document.querySelector('li:first-child');
const selector = getPath(element);
console.log(selector); // "body div.someclass ul li:first-child"

test('getPath should return the correct unique selector for the element', () => {
    document.body.innerHTML = `First item
        Second item `;

    const element = document.querySelector('li:first-child');
    const selector = getPath(element);

    expect(selector).toBe('body #parent div.someclass ul li:nth-child(1)');
});
