export interface LP {
  id: string; // 고유 ID
  title: string; // 앨범 제목
  singer: string; // 가수 이름
  price: number; // 가격 (숫자 타입으로 처리하는 게 적절)
  image: string; // 썸네일 이미지 URL
  amount: number; // 장바구니에 담긴 수량
}
