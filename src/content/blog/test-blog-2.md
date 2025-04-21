---
title: 'Test Blog 2'
tags: angular, rxjs
order: 1
datePublished: 01.02.2024
coverImage: article-cover/background.jpg
---

## Lorem Ipsum

"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."

"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."

```typescript
export class TestComponent {
  private apiService = inject(AnimeApiService);

  selectedData = output<AnimeData>();

  // control signal to select a genre and item prefix
  searchControl = signal('');
  selectedGenresId = signal<number>(1);

  // load options if genre or prefix changes
  searchedDataResource = rxResource({
    request: () => ({
      genresId: this.selectedGenresId(),
      prefix: this.searchControl(),
    }),
    loader: ({ request }) => this.apiService.searchAnime(request.prefix, request.genresId),
    defaultValue: [],
  });
}
```

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam felis libero, porttitor a interdum et, sagittis at enim. Quisque dapibus vulputate justo, nec faucibus velit vulputate quis. Vestibulum id viverra lorem. Aliquam malesuada in risus ullamcorper vulputate. Vivamus nunc velit, egestas eu euismod eget, vestibulum cursus metus. Integer et arcu vestibulum, ultrices tortor eu, pretium purus. Duis tincidunt dolor eget tellus fermentum sollicitudin.

- [Resource RFC 1: Architecture](https://github.com/angular/angular/discussions/60120)
- [Resource RFC 2: APIs](https://github.com/angular/angular/discussions/60121)

Aliquam tincidunt tortor sed augue semper sagittis. Donec semper aliquet consequat. Integer tincidunt nulla at ipsum rhoncus, sit amet porttitor est tempus. Nulla interdum metus at ipsum ullamcorper, mollis lobortis augue gravida. Aliquam faucibus eget odio et porttitor. Fusce nec luctus orci. Aliquam erat volutpat. Nulla consectetur tellus vel leo euismod ornare. Sed convallis gravida condimentum. Ut ut felis nunc.

Vivamus suscipit ante eget tortor imperdiet, aliquam bibendum sem ultrices. Vestibulum interdum nisi vitae ligula porttitor vestibulum. Aenean dapibus justo nibh, in aliquet velit efficitur sit amet. In eleifend mauris vel ligula lobortis, sed feugiat lectus iaculis. Nam vitae rhoncus lacus. Phasellus lacus lacus, eleifend quis magna et, dignissim consequat metus. Aliquam a eleifend velit. Integer et vestibulum tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer posuere massa mi, auctor gravida ante consectetur eleifend. Vivamus nec pretium nisi, sed iaculis diam. Integer vitae dui eu elit consequat placerat. Phasellus pellentesque odio sed est malesuada, ut porta ipsum condimentum. Nam consequat sapien quam, ac semper lorem tempus et. In hac habitasse platea dictumst.

Suspendisse felis lectus, pulvinar in ultrices ac, lacinia at tellus. Donec efficitur augue id felis iaculis ultrices eget nec turpis. Curabitur id lectus at ligula ornare hendrerit. In hac habitasse platea dictumst. Curabitur nec nisl dictum, auctor lectus at, dignissim lectus. Cras feugiat non elit eu dignissim. Etiam nec consectetur orci, ac pretium purus. In commodo velit ut lacinia ornare. Etiam efficitur laoreet diam ac efficitur. Nam vel vestibulum orci, eu bibendum arcu.

Donec commodo sagittis nunc, id aliquam dolor malesuada ut. Donec auctor ligula purus, at varius tellus lobortis et. Curabitur quis fermentum odio. Sed gravida lorem non ligula varius ullamcorper. Mauris vehicula urna turpis, id vehicula turpis iaculis sed. Donec et rutrum ligula, in tincidunt lorem. Nunc risus mi, varius id aliquet eu, vulputate dictum diam. Donec et elementum nibh, non hendrerit tortor. Suspendisse id semper justo. Integer diam magna, tempor id orci ac, facilisis tempus velit. Nulla ut enim a sem aliquam pretium eu et justo. Sed convallis, est non convallis volutpat, lectus erat fringilla purus, ac dapibus mi lorem at dui.

Nulla non diam eu erat cursus aliquam. Donec eu risus sed metus porta placerat. Pellentesque accumsan velit et auctor auctor. In non ligula et risus sagittis vestibulum. Donec a vulputate tortor. Fusce eu accumsan ipsum. Suspendisse sit amet aliquet lacus. Nunc elementum venenatis dui vel laoreet. Etiam velit nibh, laoreet vitae blandit vel, lobortis nec urna. Duis rutrum a quam ac vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce dignissim scelerisque ante ac placerat.

Donec interdum sapien et lorem maximus, a euismod massa molestie. Aliquam dapibus volutpat nulla eget condimentum. Duis sed fermentum nisi. Morbi nec tristique tellus. Vivamus dignissim nulla ut metus pellentesque, sed rhoncus odio facilisis. Integer ut sodales velit. Etiam maximus vestibulum justo, et tempus massa gravida euismod. Nullam tristique rutrum ex, eu gravida leo finibus ac. Nullam mi ante, euismod vel turpis et, laoreet convallis sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce imperdiet lacus ut iaculis bibendum. Aliquam vitae ultricies sem. Morbi imperdiet mi at venenatis volutpat.

Etiam eget nisl quis sem luctus maximus et id velit. Vestibulum sit amet egestas mauris. Phasellus ultricies felis vitae massa fringilla, laoreet varius velit imperdiet. Pellentesque congue mauris a odio faucibus, in consequat odio interdum. In a lorem volutpat, efficitur lorem quis, feugiat ligula. Etiam non placerat lorem. Nunc vestibulum tempor consectetur. Sed semper ipsum id urna placerat elementum. Aliquam ex nunc, rutrum ac eleifend quis, laoreet ut elit. Maecenas ultricies libero arcu, quis volutpat risus convallis sed.

Phasellus diam dolor, auctor in mollis vitae, tempus quis nibh. Curabitur tincidunt dolor metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam interdum purus a sagittis porta. Morbi mollis augue non mauris vestibulum aliquet. Pellentesque egestas lobortis quam, vel commodo metus lobortis et. Vestibulum sit amet consectetur orci, eget semper tortor.

## Summary

Phasellus orci eros, gravida a posuere ac, dictum a metus. Phasellus tincidunt ante nec urna feugiat bibendum. Donec feugiat rutrum libero in cursus. Mauris dictum in magna vehicula tincidunt. Sed accumsan lacus quis maximus euismod. Aenean euismod volutpat fermentum. Aenean nibh purus, mattis ut ultrices non, dictum nec magna. Suspendisse non quam ultricies, placerat neque ut, eleifend magna. Nunc pretium, elit sed finibus congue, augue massa feugiat libero, eu maximus tortor dui eget tellus. Nullam vel tortor vel tortor sollicitudin mollis non ac sapien. Nulla ut lacus vitae eros tincidunt fermentum at quis risus.
