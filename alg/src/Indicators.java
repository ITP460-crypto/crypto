import java.util.ArrayList;

public class Indicators {
	public static void main(String[] args) {
		int num = 30;
		float[] prices = new float[num];
		for (int i = 0; i < num; i++) {
			prices[i] = (int) (Math.random() * 100);
		}

		testLog(prices, macd(prices, 12, 24), "macd");
		testLog(prices, rsi(prices, 14), "rsi");
		testLog(prices, sma(prices, 12), "sma");
	}

	// algorithms

	public static ArrayList<Float> macd(float[] prices, int days1, int days2) {
		if (days2 > prices.length) {
			return null;
		}
		ArrayList<Float> avgArr = new ArrayList<Float>();
		for (int i = 0; i < prices.length - days2; i++) {
			float avg2 = getAvg(i, i + days2, prices);
			float avg1 = getAvg(i, i + days1, prices);
			avgArr.add(avg2 - avg1);
		}
		return avgArr;
	}

	public static ArrayList<Float> rsi(float[] prices, int days) {
		ArrayList<Float> avgArr = new ArrayList<Float>();
		for (int i = 0; i < prices.length - days; i++) {
			float gainsAvg = 0;
			float lossesAvg = 0;
			for (int n = i; n < i + days; n++) {
				float diff = prices[n + 1] - prices[n];
				if (prices[n + 1] > prices[n]) { // potential out of bounds
					gainsAvg += diff;
				} else {
					lossesAvg -= diff;
				}
			}
			gainsAvg /= days;
			lossesAvg /= days;
			avgArr.add(gainsAvg / lossesAvg);
		}
		return avgArr;
	}

	public static ArrayList<Float> sma(float[] prices, int days) {
		ArrayList<Float> avgArr = new ArrayList<Float>();
		for (int i = 0; i < prices.length - days; i++) {
			avgArr.add(getAvg(i, i + days, prices));
		}
		return avgArr;
	}

	public static ArrayList<Candlestick> candlesticks(float[] prices, int period) {
		ArrayList<Candlestick> candlesticks = new ArrayList<Candlestick>();
		float open = prices[]
		for (int i = 0; i < prices.length; i++) {
			for (int n = i; n < i + period; n++) {
				
			}
		}
		return candlesticks;
	}

	// utility

	public static void testLog(float[] orig, ArrayList<Float> vals, String title) {
		log(title + " test");
		System.out.print("[");
		for (float f : orig) {
			System.out.print(f + ", ");
		}
		log("]");
		for (float f : vals) {
			log(f);
		}
		log("\n\n\n");
	}

	public static float getAvg(int start, int end, float[] arr) {
		float avg = 0;
		for (int n = start; n < end; n++) {
			avg += arr[n];
		}
		return avg / end;
	}

	public static void log(Object o) {
		System.out.println(o);
	}

	// class

	class Candlestick {
		private float high, close, open, low;

		public Candlestick(float h, float c, float o, float l) {
			this.high = h;
			this.close = c;
			this.open = o;
			this.low = l;
		}
	}

}
