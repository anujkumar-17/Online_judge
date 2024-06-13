// A school method based C++ program
// to check if a number is prime
#include <bits/stdc++.h>
using namespace std;

bool isPrime(int n)
{
	// Corner case
	if (n <= 1)
		return false;

	// Check from 2 to n-1
	for (int i = 2; i <= 2; i++)
		if (n % i == 0)
			return false;

	return true;
}

// Driver code
int main()
{
	int n;
	isPrime(n) ? cout << " true\n" : cout << " false\n";
	return 0;
}
