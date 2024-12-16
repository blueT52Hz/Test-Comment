# Interface va trừu tượng

## 1. Tính trừu tượng

1. VD: 1 máy ATM, bthg ta chỉ biết nó có 1 số chức năng: quẹt thẻ, nhập, kiểm tra mã pin. Người tạo ra máy ATM đã trừu tượng hóa tất cả các cấu trúc bên trong để phục vụ cho những chức năng có bản đó của người dùng
   - => Cái việc rút tiền nó là ntn cụ thể thì ng dùng ko đc biết, chỉ biết nó có chức năng rút tiền, thế thôi
2. DN: 
   - Đơn giản hóa các chức năng lớn, nhiều trở thành các chức năng có bản.
   - C2: Tiết lộ những chức năng cần thiết với người dùng va ẩn những thông tin không cần thiết đi
   - Chỉ hiện ra cách thức triển khai nà ko nói lên cácht thức hoạt động
   - Ẩn đi những thông tin quan trong, Giảm sư phức tạp
3. Thể hiện thông qua abstract class và interface


## 2. Abstract Class: Lớp trừu tượng
1. Khởi tạo Abstract Class:
   1. ![Alt text](https://picsum.photos/seed/random5/800/300)
   2. Không đc quyền khởi tạo Object, mà phải khởi tạo bằng 1 class khác mở rộng từ Abstract
      1. ![Alt text](https://picsum.photos/seed/random4/800/300)
2. Vì sao phải khởi tạo 1 class cụ thể nới rộng từ abstract? 
   1. Ngoài các phương thức thông thường, abstract class còn có 1 phương thức khác gọi là phương thức trừu tượng.
      1. ![Alt text](https://picsum.photos/seed/random9/800/300)
   2. Phương thưc trừu tượng: Khi tạo Class cụ thể mở rộng từ abstract, nó phải viết lại (@Override) tất cả các phương thưc trừu tượng từ abstract class.
      1. ![Alt text](https://picsum.photos/seed/random10/800/300)
   3. Ta có thể hiểu: Trong ví dụ trên: 
      1. con vật nào cũng ngủ => nó đều đc kế thừa trực tiếp từ lớp cha.
      2. con vật nào cũng nói, nhưng mỗi con sẽ có 1 cách nói khác nhau nên vào đến từng con vật nó sẽ phải viết lại

## 3. Interface:
1. Ví dụ :
   ```java
   import java.util.ArrayList;
   interface DongVat {
      String mauLong = "vang";
      void hanhDong();
   }
   class Meo implements DongVat {
      @Override
      public void hanhDong() {System.out.println("Meo is Running");}
   }
   class Cho implements DongVat {
      @Override
      public void hanhDong() {System.out.println("Cho is Playing");}
   }
   public class Main {
      public static void main(String[] args) {
         Meo nya = new Meo();
         nya.hanhDong();

         System.out.println(" -------------- ");

         ArrayList<DongVat> dv = new ArrayList<DongVat>();
         dv.add(new Meo());
         dv.add(new Cho());
         for(DongVat d : dv)  d.hanhDong();
      }
   }

   Output: 
   Meo is Running
   -------------- 
   Meo is Running
   Cho is Playing
   ```
2. Định nghĩa:
   1. Trong Java, một interface (giao diện) là một tập hợp các phương thức trừu tượng (các phương thức không có triển khai) và các hằng số có thể được triển khai bởi các lớp. Một interface có thể được coi là một hợp đồng hoặc một bộ quy tắc mà một lớp phải tuân theo để triển khai interface.
      1. Interface gần giống abstract class nhưng không phải Class
      2. Interface coi là bản thiết kế của các Class, các Class mà implements nó phải tuân thủ theo Interface
      3. Tất cả phương thức trong Interface mặc định là abstract class.Và có thêm 1 phương thưcs là phương thức default
   2. Lợi ích:
      1. Tạo 1 bản thiết kế các hành vi cần thực hiện ở các lớp mà implement nó
      2. Cho phép ta có đc tính trừu tượng hoàn toàn
      3. Cho phép đa kế thừa (implements từ nhiều Ỉnterface khác nhau)
      4. Cho phép đạt đc tính chất loose coupling
3. Phương thức Default:
   1. VD:
   ```java
   import java.util.ArrayList;
   interface DongVatAnCo {
      String mauLong = "vang";
      void hanhDong();
      default void buocdi(){
         System.out.println("Running");
      }
      default void an(){
         System.out.println("DOng vat is eating");
      }
   }
   interface DongVatAnThit{
      void hanhDong();
      default void buocdi(){
         System.out.println("Running and Attacking");
      }
   }
   class Meo implements DongVatAnCo, DongVatAnThit{
      @Override
      public void hanhDong(){ System.out.println("Meo is Running");}
      @Override
      public void buocdi() {
         DongVatAnCo.super.buocdi();
         DongVatAnThit.super.buocdi();
      }
   }

   public class Main {
      public static void main(String[] args) {
         Meo nya = new Meo();
         nya.an();
         System.out.println("--------------------");
         nya.buocdi();
      }
   }
   
   Output: 
   Dong vat is eating
   --------------------
   Running
   Running and Attacking
   ```
   2. Tác dụng: Class implements từ Interface sẽ không cần phải implement phương thức Default.Tính năng này sẽ giúp chúng ta mở rộng các phương thức bổ sung phát sinh sau này mà không ảnh hưởng đến các class liên quan, chúng ta chỉ cần viết thêm các phương thức default trong interface.
4. Khi nào sử dụng Interface:
   1. Đa kế thừa.
   2. Đạt tính trừu tượng hoàn toàn. 
   3. Muốn thực hiện 1 hành động cụ thể nào đó nhưng ko muốn quan tâm lớp nào thực hiện nó (Phần 4.3)
5. Các tính chất:
   1. Các trường Biến trong Interface: public static (trg dc xem như biến toàn cục) final (Hằng số)
      1. ```java
         public static final String s = "Hello" 
         == String s = "Hello"
         ```
   2. Các trường của Phương thức trong Interface: 
      1. Mặc định: public abstract: Là phương thức trừu tượng và khi mở rộng đều phải Override lại nó
         ![Alt text](https://picsum.photos/seed/random5/800/300)
         ```java
         void hanhDong(); 
         == public abstract hanhDong();
         ``` 
      2. public static final
   3. Trong ví dụ ban đầu, có thể thấy ArrayList chỉ chứa KDL là DongVat. Ta có thể truyền cả Obj meo và cho, và nó còn phân biệt đc phương thưcs hanhDong() của từng Obj
## 4. So sánh Interface và Abstract Class
![Alt text](https://picsum.photos/seed/random12/800/300)
1. Đặc điểm:
   1. Kế thừa: 
      1. 1 interface chỉ có thể extend từ các interface khác
      2. 1 abstract class có thể extend từ 1 lớp khác và imple từ nhiều interface
   2. 1 Class Có thể vừa Extends Abstract vửa Implements Interface
      1. ![Alt text](https://picsum.photos/seed/random13/800/300)
   3. Biến final
      1. Interface : biến final, static
      2. Abstract: có thể là final hoặc ko, static hoặc non-static
   4. Phương thức:
      1. Interface là Empty Method (abstract method)
      2. Abstract thì có thể viết cả Abstract Method và Method.
2. Mục đích sử dụng
   1. Abstract để khái quát hóa hành vi, Interface là để chuẩn hóa hành vi
      - Interface:  Nếu ta muốn chỉ ra hành vi và cần thực hiện ở lớp implements
      - Abstract có cả các phương thức đc định nghĩa sẵn và có thể thực hiện luôn.
   2. Interface: 
      1. Định nghĩa 1 chức năng giống nhau cho nhiều Class, nhưng chúng lại không có quan hệ với nhau. Vd:nói, thì Chó và Mèo lại kêu khác hẳn nhau,nên ta implement từ 1 Interface DongVat
      2. Sử dụng đa kế thừa.
      3. Muốn xác định những hành vi nhưng ko quan tâm đến lớp nào sẽ thực thi.
   3. Abstract class: 
      1. Chia sẻ code trong quan hệ kế thừa
      2. Muốn lớp có cả thành phần private và protected
      3. Muốn lớp có cả thành phần static, final
   

## Buổi học: 
1. Tính trừu tượng
2. Khác nhau Abstract Class và Interface có Default:
   1. Đa kế thừa.
3. Không thể tạo Object từ Abstract và Interface:
   1. Vì: Mục đích đã ko phải thế
   2. Phương thức nó ko có nội dung.
4. Khi nào sử dụng Interface: 
   1. Định nghĩa 1 chức năng giống nhau cho nhiều Class, nhưng chúng lại không có quan hệ với nhau. 
      1. Vd:nói, thì Chó và Mèo lại kêu khác hẳn nhau,nên ta implement từ 1 Interface DongVat
      2. Vd: trong 1 đội bóng, nhiều cầu thủ chơi ở 1 vị trí, nhưng cách chơi khác hẳn nhau. Khi ta khai báo riêng cho từng tk thì nó ko bị đá chân nhau.
5. Định nghĩa luôn phương thức khi khai báo cho từng đối tượng
   ```java
   public class Main {
      public static void main(String[] args) {


         DongVatAnThit d = new DongVatAnThit() {
               @Override
               public void hanhDong() {
                  System.out.println("Choa");
               }
         };
      }
   }
   ```
- Tác dụng:
  - 1 nút bấm, bấm vaò nó sẽ tạo luôn cho mình từng sự kiện riêng. 
    - => ta phải định nghĩa riêng cho từng nút.
  - lợi: ta có thể sử dụng luốn những cái biến đang xử lý trên đó. ![Alt text](https://picsum.photos/seed/random14/800/300)
- Call Back: truyênf hàm vào trong hàm.# Interface va trừu tượng
