function component2() {
    const element2 = document.createElement('div');

    element2.innerHTML = _.join(['Hello', 'webpack', '2'], ' ');

    return element2;
}

document.body.appendChild(component2());