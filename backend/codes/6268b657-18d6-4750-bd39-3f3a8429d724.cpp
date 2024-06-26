#include <bits/stdc++.h>
using namespace std;

int countPrimes(int n) {
        // Create a vector to mark primes, initially all set to 1.
        vector<int> prime(n + 1, 1);
        // Iterate up to sqrt(n) to mark multiples of primes as non-prime.
        for (int i = 2; i * i <= n; i++) {
            if (prime[i] == 1) {
                // Mark multiples of current prime as non-prime.
                for (int j = i * i; j <= n; j += i) {
                    prime[j] = 0;
                }
            }
        }
  
        int cnt = 0;
        // Count primes by checking remaining 1s in the vector.
        for (int i = 2; i < n; i++) {
            if (prime[i] == 1)
                cnt++;
        }
        return cnt;
}

int main() {
        int n;cin>>n;
	cout<<countPrimes(n);
      // you can start writing your code from here

        return 0;
}