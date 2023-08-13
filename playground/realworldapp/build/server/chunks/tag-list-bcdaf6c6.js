import { c as create_ssr_component, b as each, e as escape } from './ssr-32dfd25c.js';

const Tag_list = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tags } = $$props;
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
    $$bindings.tags(tags);
  return `<ul class="tag-list">${each(tags, (tag) => {
    return `<li class="tag-default tag-pill tag-outline">${escape(tag)} </li>`;
  })}</ul>`;
});

export { Tag_list as default };
//# sourceMappingURL=tag-list-bcdaf6c6.js.map
