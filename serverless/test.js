const assert = require('assert')
const { getShiftCode, getRegex } = require('./handler.js')

const tweets = [
  { full_text: 'Use these SHiFT codes to unock  Golden Keys in Borderlands: The Pre-Sequel! [Active through 04/22]\nBL:TP\nPC / Mac / Linux: 5WKBT-RKRW6-35BTB-3T3TJ-XTCHF\nXBOne/XB360: 5WKBT-RKRZ3-66FTF-5X3TJ-XTCXB\nPS4/PS3: 5KWT3-J6FKH-SZTCT-HBK3J-HZ55R' },
  { full_text: 'It looks like the website is having some issues with Xbox SHiFT codes. Everything should work as intended by redeeming in-game!' },
  { full_text: 'These SHiFT codes for 5 Golden Keys will grant you some new loot in Borderlands 2! [Active through 04/29]\nBL2\nPC/Mac: C3K3J-CH59J-XFT6K-T33J3-9WTJ9\nXB360/XBOne: K3C3T-CHRF5-S9FXZ-5FB3T-3X6KX\nPS3/PS4/PS Vita/PSVR: 5TCTT-FZJZ9-ZTCZ5-ZBKTB-WJ5CX' }
]

const pc = getRegex('pc')
assert.strictEqual('5WKBT-RKRW6-35BTB-3T3TJ-XTCHF', getShiftCode([tweets[0]], pc))
assert.strictEqual(null, getShiftCode([tweets[1]], pc))
assert.strictEqual('C3K3J-CH59J-XFT6K-T33J3-9WTJ9', getShiftCode([tweets[2]], pc))

const xbox = getRegex('xbox')
assert.strictEqual('5WKBT-RKRZ3-66FTF-5X3TJ-XTCXB', getShiftCode([tweets[0]], xbox))
assert.strictEqual(null, getShiftCode([tweets[1]], xbox))
assert.strictEqual('K3C3T-CHRF5-S9FXZ-5FB3T-3X6KX', getShiftCode([tweets[2]], xbox))

const ps = getRegex('ps')
assert.strictEqual('5KWT3-J6FKH-SZTCT-HBK3J-HZ55R', getShiftCode([tweets[0]], ps))
assert.strictEqual(null, getShiftCode([tweets[1], ps]))
assert.strictEqual('5TCTT-FZJZ9-ZTCZ5-ZBKTB-WJ5CX', getShiftCode([tweets[2]], ps))

console.info('OK')
