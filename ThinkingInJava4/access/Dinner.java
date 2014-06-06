//: access/Dinner.java
// Uses the library.
import access.dessert.*;

public class Dinner {
	//由于Cooike类是public，所以可以访问Cookie类
	//但是，bite方法是不能访问的，因为Cookie是在不同的包中
  public static void main(String[] args) {
    Cookie x = new Cookie();
    //! x.bite(); // Can't access
  }
} /* Output:
Cookie constructor
*///:~
