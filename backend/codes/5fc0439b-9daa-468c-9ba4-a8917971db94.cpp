
    #include <bits/stdc++.h>
    using namespace std;

    bool isPalindrome(int x) {
        if (x < 0) {
            return false;
        }

        long long reversed = 0;
        long long temp = x;

        while (temp != 0) {
            int digit = temp % 10;
            reversed = reversed * 10 + digit;
            temp /= 10;
        }

        if(reversed == x) return true;
        return false;
    }
    
    int main() {
      
      // you can start writing your code from here
      int x;cin>>x;
      cout<<isPalindrome(x);
      return 0;
    }
  