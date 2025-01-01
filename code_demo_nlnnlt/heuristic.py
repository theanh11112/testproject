# Các chuyển động hợp lệ của con mã (x, y)
move_x = [2, 1, -1, -2, -2, -1, 1, 2]
move_y = [1, 2, 2, 1, -1, -2, -2, -1]

# Hàm kiểm tra xem di chuyển có hợp lệ không
def is_valid_move(x, y, board):
    return 0 <= x < N and 0 <= y < N and board[x][y] == -1

# Hàm đếm số lượng các bước đi hợp lệ từ vị trí (x, y)
def count_valid_moves(x, y, board):
    count = 0
    for i in range(8):
        next_x = x + move_x[i]
        next_y = y + move_y[i]
        if is_valid_move(next_x, next_y, board):
            count += 1
    return count

# Thuật toán Warnsdorff để giải bài toán con mã đi tuần
def solve_knights_tour_heuristic(start_x, start_y):
    # Tạo bàn cờ với tất cả các ô chưa được ghé thăm
    board = [[-1 for _ in range(N)] for _ in range(N)]
    # Bắt đầu từ ô (start_x, start_y)
    x, y = start_x, start_y
    board[x][y] = 0  # Đánh dấu ô đầu tiên
    # Thực hiện N*N-1 bước đi tiếp theo
    for move in range(1, N * N):
        # Tìm nước đi có ít lựa chọn nhất
        min_degree = float('inf')
        next_x, next_y = -1, -1

        for i in range(8):
            nx = x + move_x[i]
            ny = y + move_y[i]

            if is_valid_move(nx, ny, board):
                degree = count_valid_moves(nx, ny, board)
                if degree < min_degree:
                    min_degree = degree
                    next_x, next_y = nx, ny
        # Nếu không tìm được nước đi hợp lệ, trả về thất bại
        if next_x == -1 and next_y == -1:
            return False
        # Di chuyển tới ô tiếp theo
        x, y = next_x, next_y
        board[x][y] = move  # Đánh dấu ô đã ghé thăm
    # In ra kết quả nếu thành công
    for row in board:
        print(row)
    return True

# Nhập kích thước và vị trí bắt đầu từ bàn phím
N = int(input("Nhập kích thước bàn cờ (N): "))
start_x = int(input("Nhập tọa độ hàng bắt đầu (0 đến {}): ".format(N - 1)))
start_y = int(input("Nhập tọa độ cột bắt đầu (0 đến {}): ".format(N - 1)))

# Kiểm tra xem vị trí bắt đầu có hợp lệ không
if 0 <= start_x < N and 0 <= start_y < N:
    if not solve_knights_tour_heuristic(start_x, start_y):
        print("Không có lời giải cho bài toán này.")
else:
    print("Vị trí bắt đầu không hợp lệ.")
