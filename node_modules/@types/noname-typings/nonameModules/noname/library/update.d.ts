/**
 * 字节转换
 * @param { number } limit
 */
export function parseSize(limit: number): string;
/**
 * 对比版本号
 * @param { string } ver1
 * @param { string } ver2
 * @returns { -1 | 0 | 1 }
 */
export function checkVersion(ver1: string, ver2: string): -1 | 0 | 1;
/**
 *
 * 获取指定仓库的tags
 * @param { Object } options
 * @param { string } [options.username = 'libccy'] 仓库拥有者
 * @param { string } [options.repository = 'noname'] 仓库名称
 * @param { string } [options.accessToken] 身份令牌
 * @returns { Promise<{ commit: { sha: string, url: string }, name: string, node_id: string, tarball_url: string, zipball_url: string }[]> }
 *
 * @example
 * ```js
 * getRepoTags().then(tags => {
 * 	console.log("All tags:", tags.map(tag => tag.name));
 * 	// 获取最新tag（假设按时间顺序排列，最新tag在数组首位）
 * 	const latestTag = tags[0].name;
 * 	console.log("Latest tag:", latestTag);
 * });
 * ```
 */
export function getRepoTags(options?: {
    username?: string;
    repository?: string;
    accessToken?: string;
}): Promise<{
    commit: {
        sha: string;
        url: string;
    };
    name: string;
    node_id: string;
    tarball_url: string;
    zipball_url: string;
}[]>;
/**
 * 获取指定仓库的指定tags的描述
 * @param { string } tagName tag名称
 * @param { Object } options
 * @param { string } [options.username = 'libccy'] 仓库拥有者
 * @param { string } [options.repository = 'noname'] 仓库名称
 * @param { string } [options.accessToken] 身份令牌
 * @example
 * ```js
 * getRepoTagDescription('v1.10.10')
 * 	.then(description => console.log(description))
 * 	.catch(error => console.error('Failed to fetch description:', error));
 * ```
 */
export function getRepoTagDescription(tagName: string, options?: {
    username?: string;
    repository?: string;
    accessToken?: string;
}): Promise<{
    /** @type { { browser_download_url: string, content_type: string, name: string, size: number }[] } tag额外上传的素材包 */
    assets: {
        browser_download_url: string;
        content_type: string;
        name: string;
        size: number;
    }[];
    author: {
        /** @type { string } 用户名 */
        login: string;
        /** @type { string } 用户头像地址 */
        avatar_url: string;
        /** @type { string } 用户仓库地址 */
        html_url: string;
    };
    /** @type { string } tag描述 */
    body: string;
    /** @type { string } tag页面 */
    html_url: string;
    /** @type { string } tag名称 */
    name: string;
    /** 发布日期 */
    published_at: string;
    /** @type { string } 下载地址 */
    zipball_url: string;
}>;
/**
 *
 * 获取仓库指定分支和指定目录内的所有文件和目录
 * @param { string } [path = ''] 路径名称(可放参数)
 * @param { string } [branch = ''] 仓库分支名称
 * @param { Object } options
 * @param { string } [options.username = 'libccy'] 仓库拥有者
 * @param { string } [options.repository = 'noname'] 仓库名称
 * @param { string } [options.accessToken] 身份令牌
 * @returns { Promise<{ download_url: string, name: string, path: string, sha: string, size: number, type: 'file' } | { download_url: null, name: string, path: string, sha: string, size: 0, type: 'dir' }> }
 * @example
 * ```js
 * getRepoFilesList()
 * 	.then(files => console.log(files))
 * 	.catch(error => console.error('Failed to fetch files:', error));
 * ```
 */
export function getRepoFilesList(path?: string, branch?: string, options?: {
    username?: string;
    repository?: string;
    accessToken?: string;
}): Promise<{
    download_url: string;
    name: string;
    path: string;
    sha: string;
    size: number;
    type: 'file';
} | {
    download_url: null;
    name: string;
    path: string;
    sha: string;
    size: 0;
    type: 'dir';
}>;
/**
 * 请求一个文件而不是直接储存为文件
 * @param { string } url
 * @param { (receivedBytes: number, total?:number, filename?: string) => void } [onProgress]
 * @example
 * ```js
 * await getRepoTagDescription('v1.10.10').then(({ zipball_url }) => request(zipball_url));
 * ```
 */
export function request(url: string, onProgress?: (receivedBytes: number, total?: number, filename?: string) => void): Promise<Blob>;
/**
 *
 * @param { string } [title]
 * @param { string | number } [max]
 * @param { string } [fileName]
 * @param { string | number } [value]
 * @returns { progress }
 */
export function createProgress(title?: string, max?: string | number, fileName?: string, value?: string | number): progress;
