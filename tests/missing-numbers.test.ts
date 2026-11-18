import { test } from "node:test"
import assert from "node:assert/strict"
import { formatNumberList, parseMissingNumbers } from "../lib/missing-numbers.ts"

test("números soltos e faixas", () => {
  const r = parseMissingNumbers("7, 12, 30-35, 101", 1, 300)
  assert.deepEqual(r.numbers, [7, 12, 30, 31, 32, 33, 34, 35, 101])
  assert.deepEqual(r.invalid, [])
})

test("separadores variados, 'a' como faixa e faixa invertida", () => {
  const r = parseMissingNumbers("3;4\n10 a 12  20–18 #50 nº60", 1, 300)
  assert.deepEqual(r.numbers, [3, 4, 10, 11, 12, 18, 19, 20, 50, 60])
})

test("repetidos são unidos e contados", () => {
  const r = parseMissingNumbers("5, 5, 4-6", 1, 300)
  assert.deepEqual(r.numbers, [4, 5, 6])
  assert.equal(r.duplicates, 2)
})

test("inválidos e fora da coleção são separados", () => {
  const r = parseMissingNumbers("abc, 0, 301, 12", 1, 300)
  assert.deepEqual(r.numbers, [12])
  assert.deepEqual(r.invalid, ["abc"])
  assert.deepEqual(r.outOfRange, [0, 301])
})

test("formatação compacta", () => {
  assert.equal(formatNumberList([35, 1, 2, 3, 7, 8, 30, 31, 32, 33, 34]), "1-3, 7, 8, 30-35")
  assert.equal(formatNumberList([]), "")
})
