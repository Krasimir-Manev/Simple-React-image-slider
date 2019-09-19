# Simple-React-image-slider

#### Using images from the public folder

## Slider properties:

**duration** - `number`, default `2000`(ms)

**width** - `number`, default `700`(px)

**currentImage** - `boolean`, default `true`

Show the current image from all images such ass (1/3), (2/3) etc.

## Simple use

Add all the images which want to be slide

```js
const imagesFor = {
    slider: [
        ./images/image-one.jpg,
        ./images/image-two.jpg,
        ./images/image-three.jpg,
        ./images/image-four.jpg,
        ./images/image-five.jpg
    ]
}

const {slider} = imagesFor;
```

```jsx
<Slider images={slider} />
```

## Use Slider like a modal with Galery

![Slider](https://user-images.githubusercontent.com/54322382/65133009-9cff0e80-da0a-11e9-9953-cd66ebc012d2.gif)

## Galery properties:

**width** - `number`, default `800`(px)

## Simple use

```js
const imagesFor = {
    slider: [
        ./images/image-one.jpg,
        ./images/image-two.jpg,
        ./images/image-three.jpg,
        ./images/image-four.jpg
        ./images/image-five.jpg
    ],
     galery: [
        ./images/image-one.jpg,
        ./images/image-two.jpg,
        ./images/image-three.jpg
    ]
}

const {galery, slider} = imagesFor;
```

```jsx
<Galery galeryImages={galery}>
  {({ currentIndex, onModalClose }) => {
    return (
      <Slider
        currentIndex={currentIndex}
        images={slider}
        onModalClose={onModalClose}
      />
    );
  }}
</Galery>
```
