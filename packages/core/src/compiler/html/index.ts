import * as path from "node:path";

import * as RA from "@effect/data/ReadonlyArray";

import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";

import { pipe } from "@effect/data/Function";
import render from "dom-serializer";
import { ChildNode, DomHandler } from "domhandler";
import { Parser } from "htmlparser2";
import { Rule, Tags, rules } from "./rules.js";

const rules_by_tag = pipe(
  rules,
  RA.reduce({} as Record<Tags, Rule[]>, (acc, rule) => {
    acc[rule.tag] = [...(acc[rule.tag] ?? []), rule];
    return acc;
  })
);

function is_local_path(path: string) {
  return (
    !path.startsWith("http:") &&
    !path.startsWith("https:") &&
    !path.startsWith("//")
  );
}

function walk_children(
  nodes: ChildNode[],
  visitor: (node: ChildNode) => ChildNode
): ChildNode[] {
  return nodes.map((node) => {
    const _node = node;

    if ("childNodes" in _node) {
      _node.childNodes = walk_children(_node.childNodes, visitor);
    }

    return visitor(_node);
  });
}

export function transform(
  code: string,
  { filename, cwd = process.cwd() }: { cwd: string; filename: string }
): TE.TaskEither<Error, string> {
  return () =>
    new Promise((resume) => {
      console.log("here");

      const handler = new DomHandler((error, dom) => {
        if (error) {
          resume(E.left(error));
        } else {
          const nodes = walk_children(dom, (node) => {
            const name = ("name" in node ? node.name : node.type) as Tags;
            const rules = rules_by_tag[name];

            if ("attribs" in node && rules) {
              for (let rule of rules) {
                if (name === rule.tag) {
                  for (let name in node.attribs) {
                    const value = node.attribs[name];

                    const parsed = path.parse(filename);

                    if (
                      name === rule.attribute &&
                      value &&
                      is_local_path(value)
                    ) {
                      const resolved = path.resolve(parsed.dir, value);
                      const source = path.relative(cwd, resolved);
                      node.attribs[name] = `${value}?s=${source}`;
                    }
                  }
                }
              }
            }

            return node;
          });

          resume(E.right(render(nodes, { encodeEntities: false })));
        }
      });

      const parser = new Parser(handler, {
        lowerCaseTags: false,
        recognizeSelfClosing: true,
      });

      parser.write(code);

      parser.end();
    });
}
