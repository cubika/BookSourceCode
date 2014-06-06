//: access/Cake.java
// Accesses a class in a separate compilation unit.

//没有指定package，就放到了default package中，同一个包内可以调用
class Cake {
  public static void main(String[] args) {
    Pie x = new Pie();
    x.f();
  }
} /* Output:
Pie.f()
*///:~
