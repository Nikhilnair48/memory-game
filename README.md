# Memory Game Repository

Contains **two iterations** of a Memory Game built with HTML, CSS, and JavaScript.

Objectives:
- Twelve cards (6 pairs) that flip on click.
- Matching logic: matched pairs remain face-up; unmatched pairs flip back.
- A shuffle function to randomize card positions.
- A restart button to reset the game.
- Responsive design for desktop and mobile.

## Versions

### Version 1 (V1)

#### Approach

- **Manual HTML Layout**: Each card is hardcoded in `index.html`.
- **Straightforward JavaScript**: Game logic operates on DOM elements directly.

#### Reflection
- **Pros**: Easy to see everything in HTML, beginner-friendly.
- **Cons**: Less flexible for future expansions or dynamic changes.

### Version 2 (V2)

#### Approach:

- **Dynamic Composition**: A single JS manager object (`GameManager`) creates the entire UI (header, cards, etc.).
- **Encapsulated Logic**: Uses a `Card` factory/object for each card and a shuffle utility function.

#### Reflection
- **Pros**: More maintainable, easily scalable, clearer separation of concerns.
- **Cons**: Slightly steeper learning curve, more abstract than a purely HTML-driven approach.

## Setup and Usage

1. **Clone the Repo**  
   ```bash git clone https://github.com/yourusername/memory-game.git```


2. **Run using any local server**
    ```npm install -g http-server && http-server``` OR ```python3 -m http.server 8000```
