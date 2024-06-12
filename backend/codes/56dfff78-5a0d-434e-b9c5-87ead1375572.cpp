#include <iostream>
using namespace std;

int main() {
    int a = 0, b = 0, sum = 0;
    cin >> a >> b;
    std::cin.ignore(); // Clear the input stream

    sum = a + b;
    cout << sum << endl;
    return 0;
}