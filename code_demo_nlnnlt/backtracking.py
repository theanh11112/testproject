#Giải bài toán Con mã đi tuần bằng giải thuật Quay lui(Backtracking)
# Các bước di chuyển hợp lệ của quân mã (x, y)
move_x = [2, 1, -1, -2, -2, -1, 1, 2]
move_y = [1, 2, 2, 1, -1, -2, -2, -1]

# Kiểm tra xem nước đi (x, y) có nằm trong giới hạn bàn cờ và ô đó chưa được đi qua không
def is_safe(x, y, board, N):
    return 0 <= x < N and 0 <= y < N and board[x][y] == -1

# In bàn cờ sau khi tìm được hành trình của mã đi tuần
def print_board(board):
    for row in board:
        print(row)

# Hàm đệ quy để giải bài toán mã đi tuần
def solve_knights_tour(N, start_x, start_y):
    # Tạo bàn cờ và khởi tạo giá trị -1 cho tất cả các ô (chưa đi qua)
    board = [[-1 for _ in range(N)] for _ in range(N)]
    # Khởi tạo vị trí bắt đầu cho quân mã
    board[start_x][start_y] = 0  
    # Bắt đầu di chuyển từ vị trí xuất phát và gọi đệ quy để tìm các nước đi tiếp theo
    if not solve_knight(start_x, start_y, 1, board, N):
        print("Không tìm được lời giải")
    else:
        print_board(board)

# Hàm đệ quy để thử các bước đi của quân mã
def solve_knight(x, y, move_i, board, N):
    # Nếu quân mã đã đi qua tất cả các ô, trả về True (tìm được lời giải)
    if move_i == N * N:
        return True
    # Thử tất cả các nước đi hợp lệ của quân mã từ (x, y)
    for i in range(8):
        next_x = x + move_x[i]
        next_y = y + move_y[i]
        # Kiểm tra xem nước đi tiếp theo có hợp lệ không
        if is_safe(next_x, next_y, board, N):
            # Đánh dấu bước đi
            board[next_x][next_y] = move_i
            # Gọi đệ quy để thực hiện nước đi tiếp theo
            if solve_knight(next_x, next_y, move_i + 1, board, N):
                return True
            # Nếu không tìm được lời giải, quay lui (backtrack)
            board[next_x][next_y] = -1  # Hủy bỏ bước đi này

    return False  # Không tìm được bước đi hợp lệ, trả về False

# Hàm chính để nhập kích cỡ bàn cờ và vị trí xuất phát
def main():

    N = int(input("Nhập kích thước bàn cờ N x N: "))
    start_x = int(input(f"Nhập tọa độ x của vị trí xuất phát (0-{N-1}): "))
    start_y = int(input(f"Nhập tọa độ y của vị trí xuất phát (0-{N-1}): "))
    solve_knights_tour(N, start_x, start_y)

main()
