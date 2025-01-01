# Khởi tạo các giá trị ban đầu
MAX = 8
A = [[0 for _ in range(MAX)] for _ in range(MAX)]  # Khởi tạo mảng giá trị 0
X = [-2, -2, -1, -1, 1, 1, 2, 2]  # Hướng di chuyển của con mã theo trục x
Y = [-1, 1, -2, 2, -2, 2, -1, 1]  # Hướng di chuyển của con mã theo trục y
dem = 0  # Số bước đi
n = 0  # Kích thước bàn cờ

# Hàm xuất kết quả bàn cờ
def xuat():
    for i in range(n):
        for j in range(n):
            print(f"{A[i][j]:2d}", end=" ")  # Xuất bàn cờ với khoảng cách hợp lý
        print()
    print()

# Hàm di chuyển của con mã
def diChuyen(x, y):
    global dem  # Sử dụng biến toàn cục dem
    dem += 1  # Tăng số bước đi
    A[x][y] = dem  # Đánh dấu ô đã đi

    for i in range(8):
        # Kiểm tra xem mã đã đi hết bàn cờ chưa
        if dem == n * n:
            print("Các bước đi là:")
            xuat()
            exit(0)  # Kết thúc chương trình khi tìm được đường đi

        # Tạo bước đi mới
        u = x + X[i]  # Vị trí mới của x
        v = y + Y[i]  # Vị trí mới của y

        # Nếu hợp lệ thì tiến hành di chuyển
        if 0 <= u < n and 0 <= v < n and A[u][v] == 0:
            diChuyen(u, v)

    # Nếu không tìm được bước đi thì trả lại giá trị ban đầu
    dem -= 1
    A[x][y] = 0

# Hàm chính
if __name__ == "__main__":
    n = int(input("Nhập n: "))  # Nhập kích thước bàn cờ
    a = int(input("Nhập vị trí ban đầu x: "))  # Nhập vị trí ban đầu của mã
    b = int(input("Nhập vị trí ban đầu y: "))
    diChuyen(a, b)  # Gọi hàm di chuyển

    # Nếu không tìm được đường đi thì thông báo
    print("Không tìm thấy đường đi.")
