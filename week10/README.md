# template
# Week 10 — Nocturne: Music Visualization

## Concept

For this project, I chose *Nocturne* by Nana Ouyang because it is one of my favorite songs. I really like the cello and piano, and this song always gives me a lot of room for imagination. I wanted to turn the feelings I get from listening to this music into a visual experience.

## Visual Design

I used a breathing circle, glowing ribbons, and small stars to create a dreamy atmosphere. These are all visual elements that I personally like.

I also really enjoy nighttime, and I happened to work on this project at night. This inspired me to use a dark background with soft, glowing colors. I wanted the whole visualization to feel like a quiet night sky.

The circle changes its size with the music, the ribbons flow across the screen, and the stars gently move and twinkle.

## Interaction

I added two sliders to let users change the visual effects:

**Color:** Changes the colors from purple to orange.
**Motion:** Controls the movement amplitude of the glowing ribbons. Higher values create larger waves, while lower values make them calmer.

Users can also play and pause the music.

## Technical Process

I used **p5.js and p5.sound** to create this project.

I used `loadSound()` to load the music and `p5.Amplitude()` to analyze its volume. The volume data controls the size of the breathing circle and the movement of the glowing ribbons.

I also used `p5.FFT()` to analyze the frequency spectrum. I calculated the energy in the high-frequency range and used it to control the brightness and size of the stars.

For the glowing ribbons, I used sine waves and drew multiple layers of transparent lines to create a soft glow. I also changed the line thickness along the waves to make them look more natural.

Finally, I used `createSlider()` to create the Color and Motion controls.

## Reflection

I tested my visualization with three songs that have strong rhythms, and the visual effects worked well with all of them. I was happy to see how the same visual system could respond to different music.

One limitation I noticed is that the animation might become laggy when the rhythm is too fast. I tried to improve the performance by simplifying the glowing effects and reducing the number of lines drawn.

Overall, I am happy with the final result. I enjoyed combining my favorite music and visual elements into an interactive experience.
---

This is a README file that can be used to describe and document your assignment.

Markdown Cheatsheet (from [https://www.markdownguide.org/cheat-sheet/](https://www.markdownguide.org/cheat-sheet/)):

---

# Heading1
## Heading2
### Heading3
#### Heading4
##### Heading5
###### Heading6

**bold text**

*italicized text*

~~strikethrough text~~

Ordered List:
1. First item
2. Second item
3. Third item

Unordered List:
- First item
- Second item
- Third item

`short code block`

```
extended code block
fun() {
  return 0
}
```

Link:  
[linked text](https://www.example.com)


Image with url:  
![image description](https://dm-gy-6063-2024f-b.github.io/assets/homework/02/clark-espaco-modulado-00.jpg)


Image on repo:  
![image description](./file-name.jpg)


To start a new line, add two spaces at the end of a line, like this:  
this is a new line.


To start a new paragraph, leave an empty line between two lines of text.

This is a new paragraph.
