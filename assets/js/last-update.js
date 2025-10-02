/**
 * 获取GitHub仓库最后提交时间并显示在页面上
 */
async function fetchLastUpdateTime() {
  try {
    const repository = 'zzaiyan/zzaiyan.github.io';
    const apiUrl = `https://api.github.com/repos/${repository}/commits/main`;
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const lastCommitDate = new Date(data.commit.author.date);
    
    // Format date in English
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Shanghai'
    };
    
    const formattedDate = lastCommitDate.toLocaleDateString('en-US', options);
    
    // Update page element
    const lastUpdateElement = document.getElementById('last-update');
    if (lastUpdateElement) {
      lastUpdateElement.textContent = `Last updated ${formattedDate}`;
      lastUpdateElement.style.display = 'block';
    }
  } catch (error) {
    console.warn('Failed to fetch last update time:', error);
    // 如果获取失败，隐藏元素或显示默认文本
    const lastUpdateElement = document.getElementById('last-update');
    if (lastUpdateElement) {
      lastUpdateElement.style.display = 'none';
    }
  }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', fetchLastUpdateTime);