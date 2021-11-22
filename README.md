# Lightning Visualisation ⚡

A visualisation of the A* pathfinding algorithm made to look like lightning
travelling from source to sink, similar to this [video of lightning over Chicago](https://www.youtube.com/watch?v=jFB4pkLjFCo).

The visualisation can be viewed here: [Lightning Visualisation](https://dansarno.github.io/lightning-visualisation/).

#### Key Bindings
- `p` = pause/resume animation
- `h` = show/hide nodes

### About
This animation, written in p5.js, shows the mechanism of the A* pathfinding algorithm on a regular grid of nodes. 
Not all nodes are traversable and as such there is a hidden, randomly generated maze (revealed by pressing the `h` key) which the lightning leader has to navigate through from source to sink.
Source and sink positions are randomly assigned on each visualisation reload.
A randomly city skyline is also generated with building a spire that coincides with the sink location.
The sketch concludes when the optimum path is found and the lighting leader reaches the sink node.

## Future Development
In August 2021, Numberphile posted a video of Matt Henderson's lightning visualisation (seen [here](https://www.youtube.com/watch?v=akZ8JJ4gGLs&t=228s)). 
Matt uses breadth first search to accomplish a similar visual effect.
Addtionally, he shades the frontier nodes by proximity to the sink node and gradually fades out previously shaded frontier nodes over subsequent frames of animation.

It would be good to incorporate some of Matt's techniques into this visualisation.
The codebase will need to be generalised in order to accommodate different pathfinding algorithms.
I would like to improve the GUI to enable a user to select pathfinding algorithms and have the ability to step through the animation in order to learn more about how each algorithm works.
