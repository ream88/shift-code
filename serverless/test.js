const assert = require('assert')
const { getShiftCode, getRegex } = require('./handler.js')

const tweets = [
  { full_text: 'Use these SHiFT codes to unock Golden Keys in Borderlands: The Pre-Sequel! [Active through 04/22]\nBL:TP\nPC / Mac / Linux: 5WKBT-RKRW6-35BTB-3T3TJ-XTCHF\nXBOne/XB360: 5WKBT-RKRZ3-66FTF-5X3TJ-XTCXB\nPS4/PS3: 5KWT3-J6FKH-SZTCT-HBK3J-HZ55R' },
  { full_text: 'It looks like the website is having some issues with Xbox SHiFT codes. Everything should work as intended by redeeming in-game!' },
  { full_text: 'These SHiFT codes for 5 Golden Keys will grant you some new loot in Borderlands 2! [Active through 04/29]\nBL2\nPC/Mac: C3K3J-CH59J-XFT6K-T33J3-9WTJ9\nXB360/XBOne: K3C3T-CHRF5-S9FXZ-5FB3T-3X6KX\nPS3/PS4/PS Vita/PSVR: 5TCTT-FZJZ9-ZTCZ5-ZBKTB-WJ5CX' },
  { full_text: 'Use these SHiFT codes to unlock 5 Gold Keys in Borderlands: Game of the Year! [Active through August 17]\nBL:GOTY\nAll Platforms: 5BWT3-6FWJK-K3FJH-3BJ33-KTTWF' }
]

const pc = getRegex('pc')
assert.strictEqual(getShiftCode([tweets[0]], pc), '5WKBT-RKRW6-35BTB-3T3TJ-XTCHF')
assert.strictEqual(getShiftCode([tweets[1]], pc), null)
assert.strictEqual(getShiftCode([tweets[2]], pc), 'C3K3J-CH59J-XFT6K-T33J3-9WTJ9')
assert.strictEqual(getShiftCode([tweets[3]], pc), '5BWT3-6FWJK-K3FJH-3BJ33-KTTWF')

const xbox = getRegex('xbox')
assert.strictEqual(getShiftCode([tweets[0]], xbox), '5WKBT-RKRZ3-66FTF-5X3TJ-XTCXB')
assert.strictEqual(getShiftCode([tweets[1]], xbox), null)
assert.strictEqual(getShiftCode([tweets[2]], xbox), 'K3C3T-CHRF5-S9FXZ-5FB3T-3X6KX')
assert.strictEqual(getShiftCode([tweets[3]], xbox), '5BWT3-6FWJK-K3FJH-3BJ33-KTTWF')

const ps = getRegex('ps')
assert.strictEqual(getShiftCode([tweets[0]], ps), '5KWT3-J6FKH-SZTCT-HBK3J-HZ55R')
assert.strictEqual(getShiftCode([tweets[1]], ps), null)
assert.strictEqual(getShiftCode([tweets[2]], ps), '5TCTT-FZJZ9-ZTCZ5-ZBKTB-WJ5CX')
assert.strictEqual(getShiftCode([tweets[3]], ps), '5BWT3-6FWJK-K3FJH-3BJ33-KTTWF')

console.info('OK')
