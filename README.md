# Radiology Stack - A Web Component for visualizing medical imaging stacks

Imagine you have several medical images that together form a stack (e.g., MRI, CT scan). 

If you include them in a website (e.g., a Learning Management System) in the following way

```html
<img src="1.jpg">
<img src="2.jpg">
<img src="3.jpg">
<img src="4.jpg">
<img src="5.jpg">
```

they will be shown in a vertical sequence, one after the other. This is unnatural for medical image stacks and does not allow to grasp the transversal nature of anatomical structures.

The `radiology-stack` Web Component allows to easily modify this visualization by surrounding the image sequence only with its opening and closing tag:

```html
<radiology-stack>
    <img src="1.jpg">
    <img src="2.jpg">
    <img src="3.jpg">
    <img src="4.jpg">
    <img src="5.jpg">
</radiology-stack>
```

Save the `radiology-stack.js` file somewhere and include it after the usage of the Web Component:

```html
<script src="path/to/radiology-stack.js"></script>
```

The result will be a scrollable stack. The first image will be shown on top, and subsequent images will be shown while the user scrolls through the stack. A toggle button allows to switch between the scrolling stack and the sequential visualization.
