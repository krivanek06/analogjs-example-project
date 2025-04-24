import { injectContent, injectContentFiles, MarkdownComponent } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

export const routeMeta: RouteMeta = {
  title: 'Blog Post',
  meta: route => {
    const file = injectContentFiles<{
      title: string;
      tags: string;
      datePublished: string;
      coverImage: string;
    }>().find(contentFile => {
      return contentFile.slug === route.params['slug'];
    })!;

    return [
      {
        name: 'author',
        content: 'Eduard Krivanek',
      },
      {
        property: 'og:title',
        content: file.attributes.title,
      },
      {
        property: 'og:published',
        content: file.attributes.datePublished,
      },
    ];
  },
};

@Component({
  imports: [AsyncPipe, MarkdownComponent, RouterLink, MatButtonModule],
  template: `
    <section class="mx-auto max-w-[1240px] px-4 lg:px-6">
      @if (post$ | async; as post) {
        <article class="prose prose-slate dark:prose-invert mx-auto flex w-full flex-col px-4 py-16 md:max-w-4xl gap-4">
          <!-- back button -->
          <button mat-button routerLink="/">
            <span>Back to Blog Posts</span>
          </button>

          <!-- image -->
          <img class="z-10 h-[400px] object-contain" [src]="post.attributes.coverImage" />

          <!-- content -->
          <analog-markdown class="z-10 text-white" [content]="post.content" />
        </article>
      }
    </section>
  `,
  styles: ``,
})
export default class BlogPostComponent {
  readonly post$ = injectContent<{
    title: string;
    tags: string;
    datePublished: string;
    coverImage: string;
  }>({
    param: 'slug',
    subdirectory: 'blog',
  });
}
