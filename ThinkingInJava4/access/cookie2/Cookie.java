//: access/cookie2/Cookie.java
package access.cookie2;

public class Cookie {
  public Cookie() {
    System.out.println("Cookie constructor");
  }
  //protected就是包内的权限加上子类访问权限
  protected void bite() {
    System.out.println("bite");
  }
} ///:~
