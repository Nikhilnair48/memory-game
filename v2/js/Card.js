const Card = (value) => {
    return {
        value,
        flipped: false,
        matched: false,
        // DOM reference
        element: null,
        createDOMElement(onFlipCallback) {
            const cardWrapper = document.createElement("div");
            cardWrapper.classList.add("card");

            const cardInner = document.createElement("div");
            cardInner.classList.add("card-inner");

            const front = document.createElement("div");
            front.classList.add("card-front");

            const back = document.createElement("div");
            back.classList.add("card-back");
            back.innerHTML = value;

            cardInner.appendChild(front);
            cardInner.appendChild(back);
            cardWrapper.appendChild(cardInner);

            this.element = cardWrapper;

            cardInner.addEventListener("click", () => {
                if(this.flipped || this.matched) return;
                onFlipCallback(this);
            });
            return cardWrapper;
        },
        flip() {
            this.flipped = true;
            this.element.classList.add("flip");
        },
        unflip() {
            this.flipped = false;
            this.element.classList.remove("flip");
        },
        setMatched() {
            this.matched = true;
        }
    }
}