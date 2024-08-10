
    #include <bits/stdc++.h>
    using namespace std;

    int countPrimes(int n) {
        vector<bool>prime(n+1,true);
        prime[0]=prime[1]=false;
        int c=0;
        for(int i=2;i<3;i++){
            if(prime[i]){
                c++;
                for(int j=2*i;j<n;j=j+i){
                    prime[j]=0;
                }
            }

        }
        return c;
    }
    
    int main() {
      
      // you can start writing your code from here
      int n;cin>>n;
      cout<<countPrimes(n);

      return 0;
    }
  