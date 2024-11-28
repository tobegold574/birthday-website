import os

def print_directory_tree(startpath, exclude_dirs=None):
    if exclude_dirs is None:
        exclude_dirs = {'.git', '__pycache__', 'node_modules', 'venv'}
    
    for root, dirs, files in os.walk(startpath):
        # 过滤掉不需要的目录
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        
        level = root.replace(startpath, '').count(os.sep)
        indent = '│   ' * level
        print(f'{indent}├── {os.path.basename(root)}/')
        
        sub_indent = '│   ' * (level + 1)
        for f in files:
            print(f'{sub_indent}├── {f}')

# 使用示例
print_directory_tree('.')  # 打印当前目录结构