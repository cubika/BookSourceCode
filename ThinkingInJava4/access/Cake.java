//: access/Cake.java
// Accesses a class in a separate compilation unit.

//û��ָ��package���ͷŵ���default package�У�ͬһ�����ڿ��Ե���
class Cake {
  public static void main(String[] args) {
    Pie x = new Pie();
    x.f();
  }
} /* Output:
Pie.f()
*///:~
