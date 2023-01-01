let startGameBtn = document.querySelector(".control-buttons span");

startGameBtn.addEventListener("click", (e) => {
    let name = prompt("Welcome in game, what's your name?");
    if (name == null || name == "") {
        document.querySelector(".info-container .name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".info-container .name span").innerHTML = name;
    }
    e.target.parentElement.remove();
});

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = [...Array.from(blocksContainer.children)];

let rangeBlock = [...Array.from(blocksContainer.children).keys()];

shuffle(rangeBlock);

blocks.forEach((block, index) => {

    block.style.order = rangeBlock[index];

    block.addEventListener("click", (e) => {
        flibBlock(block);
    })

})

function shuffle(array) {
    let current = array.length, random, temp;

    random = Math.floor(Math.random() * current);

    while (current > 0) {

        current--;
        // [1] Save Current Element in Stash
        temp = array[current];

        // [2] Current Element = Random Element
        array[current] = array[random];

        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    }

    return array;
}

function flibBlock(block) {
    block.classList.add("is-flipped");
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    if (allFlippedBlocks.length === 2) {

        // Stop Clicking Function
        stopClicking();

        // Check Matched Block Function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }
}

function stopClicking() {
    blocksContainer.classList.add('no-clicking');

    // Wait Duration
    setTimeout(() => {

        // Remove Class No Clicking After The Duration
        blocksContainer.classList.remove('no-clicking');

    }, duration);

}

function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.animal === secondBlock.dataset.animal) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        //   document.getElementById('success').play();

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        }, duration);

        document.getElementById('fail').play();

    }

}
