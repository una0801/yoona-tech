# DB Connection Pool

생성자: 유나
생성 일시: 2024년 5월 27일 오전 9:30
다중 선택: DB
태그: DB, 이론

### DB Connection

- DB를 사용하기 위해 DB와 애플리케이션 간 통신을 할 수 있는 수단
- DB Connection은 Database Drive와 Database 연결 정보를 담은 URL이 필요함

### Connection Pool

- 사용자의 요청에 따라 Connection을 생성하다 보면 많은 수의 연결이 발생했을 때 서버에 과부하가 걸리게 됨
- 이러한 상황을 방지하기 위해 **미리 일정 수 의 connection을 만들어 Pool에 담아뒀다가 사용자의 요청이 발생하면 연결을 해주고, 연결 종료 시 Pool에 다시 반환**

### 사용 이유?

- DB Connection Pool 매니저가 일정의 Connection 을 연결하고 있다가 요청이 들어오면 Connection을 할당해주고 없으면 기다리게 함
- 클라이언트는 Connection을 다 쓰면 다시 반납하는 구조 ( = 통신 속도 성능 향상)
- 한번 맺은 DB Connection을 바로  Close 시키지 않고 Pool에 저장한 뒤에 다음 번에 동일한 Connection을 요청하면 바로 Pool에서 꺼내 제공함으로써 빠른 DB Connection Time 보장

<!-- ![Untitled](DB%20Connection%20Pool%20b1da3241f8e24a58bdb434a2333ab1c0/Untitled.png) -->

<aside>
📌 - Database는 기본적으로 어플리케이션에서 커넥션 요청이 올 때마다 1개의 process 생성
- 생성된 프로세스는 설정된 시간(wait_timeout)이 지날 때 까지 유지
- 사용이 끝난 프로세스는 Sleep 상태에 돌입하며, 마지막 사용 시간 이 후  설정된 프로세스 생존 주기까지 살아있다가 시간이 초과됨과 동시에 프로세스 제거

</aside>

### 유의사항

- 동시 접속자가 많을 경우 : 커넥션은 한정되어, 쓸 수 있는 커넥션이 반납될 때 까지 대기
- 너무 많은 커넥션을 생성하면 → **커넥션은 객체이므로 많은 메모리를 차지**하게 되고 프로그램의 성능을 떨어뜨리는 원인! (사용량에 따른 적정량의 커넥션 객체 생성해야함)
- Connection Pool 이 커지면 성능이 좋아지는지? → **Connection의 주체는 Thread 이므로 Thread와 함께 고려**
- if Thread Pool 크기 < Connection Pool 크기
⇒ Thread Pool 에서 트랜잭션을 처리하는 Thread 가 사용하는 Connection 외에 남는 Connection은 실질적으로 메모리 공간만 차지
- Connection Pool의 적당 크기 → CPU * 2