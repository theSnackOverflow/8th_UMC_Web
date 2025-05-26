 // LP 타입: 장바구니에 들어갈 음반 정보
export type LP = {
  id: string;
  title: string;
  singer: string;
  price: number;
  image: string;
  amount: number;
};

// 장바구니 전체 상태
export interface CartState {
  cartItems: LP[];
  amount: number; // 총 수량
  total: number;  // 총 가격
}