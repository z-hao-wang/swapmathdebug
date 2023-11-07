import { BigintIsh, CurrencyAmount, Token } from '@uniswap/sdk-core';
import { Pool } from '@uniswap/v3-sdk';
import { sampleResults } from './sampleResults';
class TickDataProvider {
  protected cachedTickOneWord: Record<string, [number, boolean, number]>;
  constructor({ nextTickOneWord }: { nextTickOneWord: Record<string, [number, boolean, number]> }) {
    this.cachedTickOneWord = nextTickOneWord;
  }
  getTick(tick: number): Promise<{
    liquidityNet: BigintIsh;
    liquidityGross: BigintIsh;
  }> {
    throw new Error(`invalid get tick`);
  }
  /**
   * Return the next tick that is initialized within a single word
   * @param tick The current tick
   * @param lte Whether the next tick should be lte the current tick
   * @param tickSpacing The tick spacing of the pool
   */
  nextInitializedTickWithinOneWord(tick: number, lte: boolean, tickSpacing: number): Promise<any> {
    const key = `OneWord_${tick}_${lte}`;
    return Promise.resolve(this.cachedTickOneWord[key]);
  }
}

export async function main() {
  let counter = 0;
  for (let result of sampleResults) {
    const tokenA = new Token(1, '0xaaaad6a5669dc0b8b12febc03608860c31e2aaaa', 18, 'A', 'A');
    const tokenB = new Token(1, '0xbbbbd6a5669dc0b8b12febc03608860c31e2bbbb', 18, 'B', 'B');
    const fee = result.fee;

    const sqrtRatioX96 = result.sqrtPrice;
    const liquidity = result.liquidity;
    const tick = result.tick;
    const ticks = new TickDataProvider({ nextTickOneWord: result.nextTickOneWord as any });

    const pool = new Pool(tokenA, tokenB, fee, sqrtRatioX96, liquidity, tick, ticks);
    const inputAmount = CurrencyAmount.fromRawAmount(result.zeroForOne ? tokenA : tokenB, result.amountIn);
    const output = await pool.getOutputAmount(inputAmount);
    if (result.amountOut !== output[0].quotient.toString()) {
      console.log(`error: output = `, output[0].quotient.toString(), ` expected=`, result.amountOut);
    } else {
      console.log(`pass: output = `, output[0].quotient.toString(), ` expected=`, result.amountOut);
    }
    if (++counter > 0) break;
  }
  console.log(`all tests done`);
}

main();
// node dist/scripts/testSwapMath.js
