import './style.css'
import { defaultGame, Game, parsePgn, PgnNodeData, Node, ChildNode, makePgn } from 'chessops/pgn'


let pgn = document.querySelector<HTMLTextAreaElement>('#pgn');
let parse = document.querySelector<HTMLButtonElement>('#parse');
let file = document.querySelector<HTMLInputElement>('#file');
let output = document.querySelector<HTMLTextAreaElement>('#output');

if (pgn) {
  pgn.value = '1. e4 e5\n\n1. e4 g5';
}

const valueFromTextArea = () => Promise.resolve(pgn?.value);
const valueFromFile = () => {
  if (file?.files?.length && file.files.length > 0){
    const first = file.files.item(0);
    if (first) {
      return first.text();
    }
  }
  return Promise.resolve(undefined);
};

const doParse = async (getText: () => Promise<string | undefined>) => {
  let text = await getText();
  if (text) {
    let parsed = parsePgn(text);
    // console.log('parsed', parsed);
    let merged = mergeGames(parsed);
    console.log(merged);
    let pgn = makePgn(merged);
    console.log(pgn);
    if (output) {
      output.value = pgn;
    }
  }
}

const mergeGames = (games: Game<PgnNodeData>[]) => {
  let lines = [];
  for (const game of games) {
    for (const line of walk(game.moves, [])) {
      lines.push(line); 
    }
  }
  // console.log('all lines', lines);
  let merged = defaultGame<PgnNodeData>();
  for (const line of lines) {
    let node = merged.moves;
    for (const move of line) {
      let existing = node.children.find(child => child.data.san === move);
      if (existing) {
        node = existing;
      } else {
        let newChild = new ChildNode<PgnNodeData>({san: move});
        node.children.push(newChild);
        node = newChild;
      }
    }
  }
  return merged;
}

const walk = (node: Node<PgnNodeData>, line: string[]): string[][] => {
  let lines = [];
  for (const move of node.children) {
    let newLine = [...line, move.data.san];
    if (isLeafNode(move)) {
      // console.log(newLine);
      lines.push(newLine);
    } else {
      for (const subLine of walk(move, newLine)){
        lines.push(subLine);
      }
    }
  }
  return lines;
}

const isLeafNode = (node: ChildNode<PgnNodeData>) => {
  return node.children.length == 0;
}

parse?.addEventListener('click', () => doParse(valueFromTextArea));
file?.addEventListener('change', () => doParse(valueFromFile));