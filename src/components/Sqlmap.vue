<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <h1>SQLMAP</h1>
      </el-col>
    </el-row>
    <el-row>
      <h3>检测源</h3>
    </el-row>
    <el-row>
      <el-col :offset="1" :span="22" >
        <el-row>
          <el-col>
            <el-radio-group v-model="radio1">
                  <el-radio-button label="URL">网址</el-radio-button>
                  <el-radio-button label="DIRECT">数据库直连</el-radio-button>
                  <el-radio-button label="LOGFILE">代理日志</el-radio-button>
                  <el-radio-button label="SITEMAPURL">sitemap.xml</el-radio-button>
                  <el-radio-button label="BULKFILE">网址列表</el-radio-button>
                  <el-radio-button label="REQUESTFILE">请求数据包</el-radio-button>
                  <el-radio-button label="GOOGLEDORK">谷歌搜索</el-radio-button>
                  <el-radio-button label="CONFIGFILE">配置文件</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20" v-show="radio1 == 'URL'">
        <el-input v-model="u">
          <template slot="prepend">网址</template>
        </el-input>
      </el-col>
      <el-col :offset="2" :span="20" v-show="radio1 == 'DIRECT'">
        <el-input v-model="u">
          <template slot="prepend">数据库直连</template>
        </el-input>
      </el-col>
      <el-col :offset="2" :span="20" v-show="radio1 == 'LOGFILE'">
        <el-input v-model="u">
          <template slot="prepend">代理日志</template>
        </el-input>
      </el-col>
      <el-col :offset="2" :span="20" v-show="radio1 == 'SITEMAPURL'">
        <el-input v-model="u">
          <template slot="prepend">sitemap.xml</template>
        </el-input>
      </el-col>
      <el-col :offset="2" :span="20" v-show="radio1 == 'BULKFILE'">
        <el-input v-model="u">
          <template slot="prepend">网址列表</template>
        </el-input>
      </el-col>
      <el-col :offset="2" :span="20" v-show="radio1 == 'REQUESTFILE'">
        <el-input v-model="u">
          <template slot="prepend">请求数据包</template>
        </el-input>
      </el-col>
      <el-col :offset="2" :span="20" v-show="radio1 == 'GOOGLEDORK'">
        <el-input v-model="u">
          <template slot="prepend">谷歌搜索</template>
        </el-input>
      </el-col>
      <el-col :offset="2" :span="20" v-show="radio1 == 'CONFIGFILE'">
        <el-input v-model="u">
          <template slot="prepend">配置文件</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <h3>请求参数</h3>
    </el-row>
    <el-row>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 4, offset: 2}" :span="6">
        请求方法：<el-select v-model="method" filterable allow-create placeholder="请选择">
            <el-option
             v-for="item in methods"
             :key="item.method"
             :label="item.label"
             :value="item.method">
            </el-option>
          </el-select>
      </el-col>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 12}" :span="6">
        请求Body：<el-input type="textarea" v-model="data" placeholder="id=1"></el-input>
      </el-col>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 4}" :span="6">
        参数分割符：<el-input v-model="param_del" placeholder="& "></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-switch v-model="cookie_switch" active-color="#409EFF" inactive-color="#13ce66" active-text="从文件读取Cookie" inactive-text="手动输入Cookie">
        </el-switch>
      </el-col>
    </el-row>
    <el-row v-show="!cookie_switch">
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 16, offset: 2}">
        Cookie：<el-input v-model="cookie" placeholder="BAIDUID=D2A966A2F498:FG=1; PSTM=1561538922; BIDUPSID=32239B1ACFBA26; MCITY=-3; BDUSS=mRjY35tWDBCYlZ5TmstUnJwNklkdWd1WENLbnpTdGlCYXV5SHM0dHNSUXU2V0ZkRVFBQUFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC5cOl0uXDpdU;"></el-input>
      </el-col>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 4}">
        分割符：<el-input v-model="cookie_del" placeholder=";"></el-input>
      </el-col>
    </el-row>
    <el-row v-show="cookie_switch">
      <el-col :offset="2" :span="20">
        从文件读取Cookie：<el-input v-model="load_cookies" placeholder="C:\Users\MECHREVO\Desktop\Pentest Logs\hundan.org\Cookie.log"></el-input>
      </el-col>
    </el-row>
    <el-row class="aleft">
      <el-col :sm="{offset: 2, span: 20}" :xs="{offset: 2, span: 20}">
        <el-row>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 5}" :span="2">
            <el-switch v-model="drop_set_cookie" active-text="忽略Set-Cookie" ></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 3}" :span="2">
            <el-switch @change="ua_mobile_conflict(0)" v-model="mobile" active-text="伪装手机" ></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 3}" :span="2">
            <el-switch @change="ua_mobile_conflict(1)" v-model="random_agent" active-text="随机UA" ></el-switch>
          </el-col>
          <el-col class="aleft" :xs="{span: 12}" :sm="{span: 7}" :md="{span: 3}" :span="2">
            <el-switch @change="ua_mobile_conflict(2)" v-model="user_agent_switch" active-text="指定UA" ></el-switch>
          </el-col>
          <el-col class="aleft" :xs="{span: 24}" :sm="{span: 17}" :md="{span: 10}" :span="10">
            <el-input v-model="user_agent" :disabled="!user_agent_switch" placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"></el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 8}">
            指定host
            <el-input v-model="host" placeholder="hundan.org"></el-input>
          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">
            指定referer
            <el-input v-model="referer" placeholder="https://hundan.org/"></el-input>
          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">
            指定headers
            <el-input
            type="textarea"
            :rows="3"
            placeholder="Accept-Language: fr
X-Forwarded-For: 127.0.0.1
ETag: 123"
                  ></el-input>
                </el-col>
        </el-row>
      </el-col>
    </el-row>
  <el-row>
    <el-col :offset="2" :span="20">
      <el-row>
        <el-col :xs="{span: 24}" :sm="{span: 8}">
          代理
          <el-input v-model="proxy" placeholder="http://127.0.0.1:1080"></el-input>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 8}">
          代理凭证
          <el-input v-model="proxy_cred" placeholder="username:password"></el-input>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 8}">
          代理列表
          <el-input v-model="proxy_file" placeholder="file:///root/proxys.list"></el-input>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row>
    <el-col :offset="2" :span="20">
      <el-row>
        <el-col :xs="{span: 24}" :sm="{span: 8}">
          保活url
          <el-input v-model="safe_url" placeholder="https://www.target.com/index.html">
          </el-input>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 8}">
          保活data
          <el-input v-model="safe_post" placeholder="safe=true&login=admin">
          </el-input>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 8}">
          保活请求包
          <el-input v-model="safe_req" placeholder="file:///root/request.txt">
          </el-input>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 8}">
          保活频率
          <el-input v-model="safe_freq" placeholder="30">
          </el-input>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 8}">
          csrf token
          <el-input v-model="csrf_token" placeholder="">
          </el-input>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 8}">
          csrf获取url
          <el-input v-model="csrf_url" placeholder="https://www.target.com/get/csrf">
          </el-input>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 8}">
          csrf请求方法
          <el-input v-model="csrf_method" placeholder="POST">
          </el-input>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 8}">
          代码预执行
          <el-input
            v-model="eval"
            type="textarea"
            :rows="3"
            placeholder="import hashlib;id2=hashlib.md5(id).hexdigest()">
            </el-input>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row>
    <el-col :offset="2" :span="20">
      <el-row>
        <el-col :xs="{span: 24}" :sm="{span: 24}">
          <el-switch v-model="tor" active-text="tor网络" ></el-switch>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 8}">
          tor端口
          <el-input v-model="tor_port"></el-input>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 8}">
          tor类型
          <el-input v-model="tor_type" placeholder="HTTP, SOCKS4 or SOCKS5 (default)"></el-input>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 8}">
          检查tor可用性
          <el-input v-model="check_tor"></el-input>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 8}">
            401质询验证方式
            <el-select v-model="auth_type" filterable placeholder="请选择">
                <el-option
                  v-for="item in auth_types"
                  :key="item.auth_type"
                  :label="item.label"
                  :value="item.auth_type">
                </el-option>
             </el-select>
          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">
            401质询账号密码
            <el-input v-model="auth_cred" placeholder="username:password"></el-input>
          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">
            401质询PEM文件
            <el-input v-model="auth_file" placeholder="C:\Users\MECHREVO\Desktop\Pentest Logs\hundan.org\hundan.org.pem">
            </el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 10}" :sm="{span: 5}" :md="{span: 5}" :span="2">
            忽略http错误代码
            <el-input type="number" v-model="ignore_code" placeholder="500"></el-input>
          </el-col>
          <el-col :xs="{span: 7}" :sm="{span: 5}" :md="{span: 4}" :span="2">
            每次请求延时
            <el-input type="number" v-model="delay" placeholder="5">
             <template slot="append">秒</template>
            </el-input>
          </el-col>
          <el-col :xs="{span: 7}" :sm="{span: 5}" :md="{span: 4}" :span="2">
            最大超时时间
            <el-input type="number" v-model="timeout" placeholder="30">
             <template slot="append">秒</template>
            </el-input>
          </el-col>
          <el-col :xs="{span: 10}" :sm="{span: 5}" :md="{span: 4}" :span="2">
            最大超时重试
            <el-input type="number" v-model="retries" placeholder="3">
             <template slot="append">次</template>
            </el-input>
          </el-col>
          <el-col :xs="{span: 14}" :sm="{span: 4}" :md="{span: 7}" :span="2">
            参数随机填充
            <el-input v-model="randomize" placeholder="id;event;target;param3;...">
            </el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="aleft">
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}" :span="3">
            <el-switch v-model="ignore_proxy" active-text="禁用系统代理" ></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}" :span="3">
            <el-switch v-model="ignore_redirects" active-text="忽略重定向" ></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}" :span="3">
            <el-switch v-model="ignore_timeouts" active-text="忽略连接超时" ></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}" :span="3">
            <el-switch v-model="force_ssl" active-text="使用https" ></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 4}" :xl="{span: 3}" :span="3">
            <el-switch v-model="chunked" active-text="使用chunked传输" ></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 5}" :xl="{span: 3}" :span="3">
            <el-switch v-model="hpp" active-text="使用hpp技术" ></el-switch>
          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}" :md="{span: 6}" :lg="{span: 6}" :xl="{span: 4}" :span="3">
            <el-switch v-model="skip_urlencode" active-text="payload取消url编码" ></el-switch>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>检测性能优化</h3>
      </el-col>
    </el-row>
    <el-row class="aleft">
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 12}" :sm="{span: 7}" :span="3">
            <el-switch active-text="开启所有优化参数" active-value=""></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 5}" :span="3">
            <el-switch active-text="预加载"></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 6}" :span="3">
            <el-switch active-text="http keep-alive"></el-switch>
          </el-col>
          <el-col :xs="{span: 12}" :sm="{span: 6}" :span="3">
            <el-switch active-text="只看返回包长度" active-value="null-connection"></el-switch>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>注入</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 8}">p<el-input v-model="p" placeholder="Testable parameter(s)"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">skip<el-input v-model="skip" placeholder="Skip testing for given parameter(s)"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">skip-static<el-input v-model="skip_static" placeholder="Skip testing parameters that not appear to be dynamic"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">param-exclude<el-input v-model="param_exclude" placeholder="Regexp to exclude parameters from testing (e.g. 'ses')"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">param-filter<el-input v-model="param_filter" placeholder="Select testable parameter(s) by place (e.g. 'POST')"></el-input></el-col>
          <el-col :span="8">
            数据库类型：<el-select v-model="dbms" filterable placeholder="请选择">
                <el-option
                  v-for="item in dbmss"
                  :key="item.dbms"
                  :label="item.label"
                  :value="item.dbms">
                </el-option>
             </el-select>
          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">dbms-cred<el-input v-model="dbms_cred" placeholder="DBMS authentication credentials (user:password)"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">os<el-input v-model="os" placeholder="Force back-end DBMS operating system to provided value"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">invalid-bignum<el-input v-model="invalid_bignum" placeholder="Use big numbers for invalidating values"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">invalid-logical<el-input v-model="invalid_logical" placeholder="Use logical operations for invalidating values"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">invalid-string<el-input v-model="invalid_string" placeholder="Use random strings for invalidating values"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">no-cast<el-input v-model="no_cast" placeholder="Turn off payload casting mechanism"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">no-escape<el-input v-model="no_escape" placeholder="Turn off string escaping mechanism"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">prefix<el-input v-model="prefix" placeholder="Injection payload prefix string"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">suffix<el-input v-model="suffix" placeholder="Injection payload suffix string"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">tamper<el-input v-model="tamper" placeholder="Use given script(s) for tampering injection data"></el-input></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>检测</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 8}">level<el-input v-model="level" placeholder="Level of tests to perform (1-5, default 1)"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">risk<el-input v-model="risk" placeholder="Risk of tests to perform (1-3, default 1)"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">string<el-input v-model="string" placeholder="String to match when query is evaluated to True"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">not-string<el-input v-model="not_string" placeholder="String to match when query is evaluated to False"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">regexp<el-input v-model="regexp" placeholder="Regexp to match when query is evaluated to True"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">code<el-input v-model="code" placeholder="HTTP code to match when query is evaluated to True"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">smart<el-input v-model="smart" placeholder="Perform thorough tests only if positive heuristic(s)"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">text-only<el-input v-model="text_only" placeholder="Compare pages based only on the textual content"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">titles<el-input v-model="titles" placeholder="Compare pages based only on their titles"></el-input></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>技术</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 8}">technique<el-input v-model="technique" placeholder="SQL injection techniques to use (default 'BEUSTQ')"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">time-sec<el-input v-model="time_sec" placeholder="Seconds to delay the DBMS response (default 5)"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">union-cols<el-input v-model="union_cols" placeholder="Range of columns to test for UNION query SQL injection"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">union-char<el-input v-model="union_char" placeholder="Character to use for bruteforcing number of columns"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">union-from<el-input v-model="union_from" placeholder="Table to use in FROM part of UNION query SQL injection"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">dns-domain<el-input v-model="dns_domain" placeholder="Domain name used for DNS exfiltration attack"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">second-url<el-input v-model="second_url" placeholder="Resulting page URL searched for second-order response"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">second-req<el-input v-model="second_req" placeholder="Load second-order HTTP request from file"></el-input></el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <h3>指纹</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 8}">Fingerprint<el-input v-model="fingerprint" placeholder="Perform an extensive DBMS version fingerprint"></el-input></el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <h3>枚举</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 8}">a<el-input v-model="a" placeholder="Retrieve everything"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">b<el-input v-model="b" placeholder="Retrieve DBMS banner"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">current-user<el-input v-model="current_user" placeholder="Retrieve DBMS current user"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">current-db<el-input v-model="current_db" placeholder="Retrieve DBMS current database"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">hostname<el-input v-model="hostname" placeholder="Retrieve DBMS server hostname"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">is-dba<el-input v-model="is_dba" placeholder="Detect if the DBMS current user is DBA"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">users<el-input v-model="users" placeholder="Enumerate DBMS users"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">passwords<el-input v-model="passwords" placeholder="Enumerate DBMS users password hashes"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">privileges<el-input v-model="privileges" placeholder="Enumerate DBMS users privileges"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">roles<el-input v-model="roles" placeholder="Enumerate DBMS users roles"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">dbs<el-input v-model="dbs" placeholder="Enumerate DBMS databases"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">tables<el-input v-model="tables" placeholder="Enumerate DBMS database tables"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">columns<el-input v-model="columns" placeholder="Enumerate DBMS database table columns"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">schema<el-input v-model="schema" placeholder="Enumerate DBMS schema"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">count<el-input v-model="count" placeholder="Retrieve number of entries for table(s)"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">dump<el-input v-model="dump" placeholder="Dump DBMS database table entries"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">dump-all<el-input v-model="dump_all" placeholder="Dump all DBMS databases tables entries"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">search<el-input v-model="search" placeholder="Search column(s), table(s) and/or database name(s)"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">comments<el-input v-model="comments" placeholder="Check for DBMS comments during enumeration"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">statements<el-input v-model="statements" placeholder="Retrieve SQL statements being run on DBMS"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">D<el-input v-model="D" placeholder="DBMS database to enumerate"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">T<el-input v-model="T" placeholder="DBMS database table(s) to enumerate"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">C<el-input v-model="C" placeholder="DBMS database table column(s) to enumerate"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">X<el-input v-model="X" placeholder="DBMS database identifier(s) to not enumerate"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">U<el-input v-model="U" placeholder="DBMS user to enumerate"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">exclude-sysdbs<el-input v-model="exclude_sysdbs" placeholder="Exclude DBMS system databases when enumerating tables"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">pivot-column<el-input v-model="pivot_column" placeholder="Pivot column name"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">where<el-input v-model="where" placeholder="Use WHERE condition while table dumping"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">start<el-input v-model="start" placeholder="First dump table entry to retrieve"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">stop<el-input v-model="stop" placeholder="Last dump table entry to retrieve"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">first<el-input v-model="first" placeholder="First query output word character to retrieve"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">last<el-input v-model="last" placeholder="Last query output word character to retrieve"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">sql-query<el-input v-model="sql_query" placeholder="SQL statement to be executed"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">sql-shell<el-input v-model="sql_shell" placeholder="Prompt for an interactive SQL shell"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">sql-file<el-input v-model="sql_file" placeholder="Execute SQL statements from given file(s)"></el-input></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>暴力猜解</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--common-tables<el-input v-model="common_tables" placeholder="Check existence of common tables"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--common-columns<el-input v-model="common_columns" placeholder="Check existence of common columns"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--common-files<el-input v-model="common_files" placeholder="Check existence of common files"></el-input></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>UDF注入</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--udf-inject<el-input v-model="udf_inject" placeholder="Inject custom user-defined functions"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--shared-lib<el-input v-model="shared_lib" placeholder="Local path of the shared library"></el-input></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>文件系统访问</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--file-read<el-input v-model="file_read" placeholder="Read a file from the back-end DBMS file system"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--file-write<el-input v-model="file_write" placeholder="Write a local file on the back-end DBMS file system"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--file-dest<el-input v-model="file_dest" placeholder="Back-end DBMS absolute filepath to write to"></el-input></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>操作系统访问</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--os-cmd<el-input v-model="os_cmd" placeholder="Execute an operating system command"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--os-shell<el-input v-model="os_shell" placeholder="Prompt for an interactive operating system shell"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--os-pwn<el-input v-model="os_pwn" placeholder="Prompt for an OOB shell, Meterpreter or VNC"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--os-smbrelay<el-input v-model="os_smbrelay" placeholder="One click prompt for an OOB shell, Meterpreter or VNC"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--os-bof<el-input v-model="os_bof" placeholder="Stored procedure buffer overflow exploitation"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--priv-esc<el-input v-model="priv_esc" placeholder="Database process user privilege escalation"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--msf-path<el-input v-model="msf_path" placeholder="Local path where Metasploit Framework is installed"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--tmp-path<el-input v-model="tmp_path" placeholder="Remote absolute path of temporary files directory"></el-input></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>Windows注册表访问</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--reg-read<el-input v-model="reg_read" placeholder="Read a Windows registry key value"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--reg-add<el-input v-model="reg_add" placeholder="Write a Windows registry key value data"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--reg-del<el-input v-model="reg_del" placeholder="Delete a Windows registry key value"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--reg-key<el-input v-model="reg_key" placeholder="Windows registry key"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--reg-value<el-input v-model="reg_value" placeholder="Windows registry key value"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--reg-data<el-input v-model="reg_data" placeholder="Windows registry key value data"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--reg-type<el-input v-model="reg_type" placeholder="Windows registry key value type"></el-input></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>通用</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 8}">-s<el-input v-model="s" placeholder="Load session from a stored (.sqlite) file"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">-t<el-input v-model="t" placeholder="Log all HTTP traffic into a textual file"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--answers<el-input v-model="answers" placeholder="Set predefined answers (e.g. 'quit=N,follow=N')"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--batch<el-input v-model="batch" placeholder="Never ask for user input, use the default behavior"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--binary-fields<el-input v-model="binary_fields" placeholder="Result fields having binary values (e.g. 'digest')"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--check-internet<el-input v-model="check_internet" placeholder="Check Internet connection before assessing the target"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--cleanup<el-input v-model="cleanup" placeholder="Clean up the DBMS from sqlmap specific UDF and tables"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--crawl<el-input v-model="crawl" placeholder="Crawl the website starting from the target URL"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--crawl-exclude<el-input v-model="crawl_exclude" placeholder="Regexp to exclude pages from crawling (e.g. 'logout')"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--csv-del<el-input v-model="csv_del" placeholder="Delimiting character used in CSV output (default ',')"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--charset<el-input v-model="charset" placeholder="Blind SQL injection charset (e.g. '0123456789abcdef')"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--dump-format<el-input v-model="dump_format" placeholder="Format of dumped data (CSV (default), HTML or SQLITE)"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--encoding<el-input v-model="encoding" placeholder="Character encoding used for data retrieval (e.g. GBK)"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--eta<el-input v-model="eta" placeholder="Display for each output the estimated time of arrival"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--flush-session<el-input v-model="flush_session" placeholder="Flush session files for current target"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--forms<el-input v-model="forms" placeholder="Parse and test forms on target URL"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--fresh-queries<el-input v-model="fresh_queries" placeholder="Ignore query results stored in session file"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--gpage<el-input v-model="gpage" placeholder="Use Google dork results from specified page number"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--har<el-input v-model="har" placeholder="Log all HTTP traffic into a HAR file"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--hex<el-input v-model="hex" placeholder="Use hex conversion during data retrieval"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--output-dir<el-input v-model="output_dir" placeholder="Custom output directory path"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--parse-errors<el-input v-model="parse_errors" placeholder="Parse and display DBMS error messages from responses"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--preprocess<el-input v-model="preprocess" placeholder="Use given script(s) for preprocessing of response data"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--repair<el-input v-model="repair" placeholder="Redump entries having unknown character marker (?)"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--save<el-input v-model="save" placeholder="Save options to a configuration INI file"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--scope<el-input v-model="scope" placeholder="Regexp to filter targets from provided proxy log"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--skip-waf<el-input v-model="skip_waf" placeholder="Skip heuristic detection of WAF/IPS protection"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--table-prefix<el-input v-model="table_prefix" placeholder="Prefix used for temporary tables (default: 'sqlmap')"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--test-filter<el-input v-model="test_filter" placeholder="Select tests by payloads and/or titles (e.g. ROW)"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--test-skip<el-input v-model="test_skip" placeholder="Skip tests by payloads and/or titles (e.g. BENCHMARK)"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--web-root<el-input v-model="web_root" placeholder="Web server document root directory (e.g. '/var/www')"></el-input></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3>其他</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="2" :span="20">
        <el-row>
          <el-col :xs="{span: 24}" :sm="{span: 8}">-z<el-input v-model="z" placeholder="Use short mnemonics (e.g. 'flu,bat,ban,tec=EU')"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--alert<el-input v-model="alert" placeholder="Run host OS command(s) when SQL injection is found"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--beep<el-input v-model="beep" placeholder="Beep on question and/or when SQL injection is found"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--dependencies<el-input v-model="dependencies" placeholder="Check for missing (optional) sqlmap dependencies"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--disable-coloring<el-input v-model="disable_coloring" placeholder="Disable console output coloring"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--list-tampers<el-input v-model="list_tampers" placeholder="Display list of available tamper scripts"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--offline<el-input v-model="offline" placeholder="Work in offline mode (only use session data)"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--purge<el-input v-model="purge" placeholder="Safely remove all content from sqlmap data directory"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--results-file<el-input v-model="results_file" placeholder="Location of CSV results file in multiple targets mode"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--sqlmap-shell<el-input v-model="sqlmap_shell" placeholder="Prompt for an interactive sqlmap shell"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--tmp-dir<el-input v-model="tmp_dir" placeholder="Local directory for storing temporary files"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--unstable<el-input v-model="unstable" placeholder="Adjust options for unstable connections"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--update<el-input v-model="update" placeholder="Update sqlmap"></el-input></el-col>
          <el-col :xs="{span: 24}" :sm="{span: 8}">--wizard<el-input v-model="wizard" placeholder="Simple wizard interface for beginner users"></el-input></el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row>
      <el-col :offset="2" :span="20">
        <el-input v-model="command">
          <template slot="prepend">运行</template>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    ua_mobile_conflict (ref) {
      switch (ref) {
        case 0:
          if (this.$data.mobile + this.$data.random_agent + this.$data.user_agent_switch > 1) {
            this.$data.random_agent = false
            this.$data.user_agent_switch = false
          }
          break
        case 1:
          if (this.$data.mobile + this.$data.random_agent + this.$data.user_agent_switch > 1) {
            this.$data.mobile = false
            this.$data.user_agent_switch = false
          }
          break
        case 2:
          if (this.$data.mobile + this.$data.random_agent + this.$data.user_agent_switch > 1) {
            this.$data.mobile = false
            this.$data.random_agent = false
          }
      }
    }
  },
  data () {
    return {
      radio1: 'URL',
      auth_types: [{
        auth_type: '0',
        label: '无401质询'
      }, {
        auth_type: 'Basic',
        label: 'Basic'
      }, {
        auth_type: 'Digest',
        label: 'Digest'
      }, {
        auth_type: 'NTLM',
        label: 'NTLM'
      }, {
        auth_type: 'PKI',
        label: 'PKI'
      }],
      auth_type: '0',
      methods: [{
        method: 'GET',
        label: 'GET'
      }, {
        method: 'POST',
        label: 'POST'
      }, {
        method: 'HEAD',
        label: 'HEAD'
      }, {
        method: 'PUT',
        label: 'PUT'
      }, {
        method: 'CONNECT',
        label: 'CONNECT'
      }, {
        method: 'TRACE',
        label: 'TRACE'
      }, {
        method: 'PATCH',
        label: 'PATCH'
      }, {
        method: 'DELETE',
        label: 'DELETE'
      }, {
        method: 'OPTIONS',
        label: 'OPTIONS'
      }, {
        method: 'MOVE',
        label: 'MOVE'
      }],
      method: 'GET',
      dbmss: [{
        dbms: '0',
        label: '自动探测'
      }, {
        dbms: 'mssql',
        label: 'mssql'
      }, {
        dbms: 'mysql',
        label: 'mysql'
      }, {
        dbms: 'mysql 4',
        label: 'mysql 4'
      }, {
        dbms: 'mysql 5',
        label: 'mysql 5'
      }, {
        dbms: 'oracle',
        label: 'oracle'
      }, {
        dbms: 'pgsql',
        label: 'pgsql'
      }, {
        dbms: 'sqlite',
        label: 'sqlite'
      }, {
        dbms: 'sqlite3',
        label: 'sqlite3'
      }, {
        dbms: 'access',
        label: 'access'
      }, {
        dbms: 'firebird',
        label: 'firebird'
      }, {
        dbms: 'maxdb',
        label: 'maxdb'
      }, {
        dbms: 'sybase',
        label: 'sybase'
      }],
      dbms: '0',
      u: '',
      command: '',
      test: '',
      data: '',
      param_del: '',
      cookie: '',
      cookie_del: '',
      load_cookies: '',
      cookie_switch: false,
      drop_set_cookie: false,
      mobile: false,
      user_agent: '',
      user_agent_switch: false,
      random_agent: false,
      host: '',
      referer: '',
      ignore_code: '',
      ignore_proxy: false,
      ignore_redirects: false,
      ignore_timeouts: false,
      force_ssl: false,
      chunked: false,
      hpp: false,
      skip_urlencode: false,
      delay: null,
      proxy: '',
      proxy_cred: '',
      proxy_file: '',
      tor: '',
      tor_port: '',
      tor_type: '',
      check_tor: '',
      safe_url: '',
      safe_post: '',
      safe_req: '',
      safe_freq: '',
      csrf_token: '',
      csrf_url: '',
      csrf_method: '',
      eval: '',
      timeout: 3,
      retries: 5,
      randomize: '',
      auth_cred: '',
      auth_file: '',
      p: '',
      skip: '',
      skip_static: '',
      param_exclude: '',
      param_filter: '',
      dbms_cred: '',
      os: '',
      invalid_bignum: '',
      invalid_logical: '',
      invalid_string: '',
      no_cast: '',
      no_escape: '',
      prefix: '',
      suffix: '',
      tamper: '',
      level: '',
      risk: '',
      string: '',
      not_string: '',
      regexp: '',
      code: '',
      smart: '',
      text_only: '',
      titles: '',
      technique: '',
      time_sec: '',
      union_cols: '',
      union_char: '',
      union_from: '',
      dns_domain: '',
      second_url: '',
      second_req: '',
      fingerprint: '',
      a: '',
      b: '',
      current_user: '',
      current_db: '',
      hostname: '',
      is_dba: '',
      users: '',
      passwords: '',
      privileges: '',
      roles: '',
      dbs: '',
      tables: '',
      columns: '',
      schema: '',
      count: '',
      dump: '',
      dump_all: '',
      search: '',
      comments: '',
      statements: '',
      D: '',
      T: '',
      C: '',
      X: '',
      U: '',
      exclude_sysdbs: '',
      pivot_column: '',
      where: '',
      start: '',
      stop: '',
      first: '',
      last: '',
      sql_query: '',
      sql_shell: '',
      sql_file: '',
      common_tables: '',
      common_columns: '',
      common_files: '',
      udf_inject: '',
      shared_lib: '',
      file_read: '',
      file_write: '',
      file_dest: '',
      os_cmd: '',
      os_shell: '',
      os_pwn: '',
      os_smbrelay: '',
      os_bof: '',
      priv_esc: '',
      msf_path: '',
      tmp_path: '',
      reg_read: '',
      reg_add: '',
      reg_del: '',
      reg_key: '',
      reg_value: '',
      reg_data: '',
      reg_type: '',
      s: '',
      t: '',
      answers: '',
      batch: '',
      binary_fields: '',
      check_internet: '',
      cleanup: '',
      crawl: '',
      crawl_exclude: '',
      csv_del: '',
      charset: '',
      dump_format: '',
      encoding: '',
      eta: '',
      flush_session: '',
      forms: '',
      fresh_queries: '',
      gpage: '',
      har: '',
      hex: '',
      output_dir: '',
      parse_errors: '',
      preprocess: '',
      repair: '',
      save: '',
      scope: '',
      skip_waf: '',
      table_prefix: '',
      test_filter: '',
      test_skip: '',
      web_root: '',
      z: '',
      alert: '',
      beep: '',
      dependencies: '',
      disable_coloring: '',
      list_tampers: '',
      offline: '',
      purge: '',
      results_file: '',
      sqlmap_shell: '',
      tmp_dir: '',
      unstable: '',
      update: '',
      wizard: ''
    }
  }
}
</script>

<style scoped>
  .el-switch {
    /* padding-top: 30px; */
  }
  .el-input-number {
    width: 100%;
  }
  .el-select {
    display: block;
  }
  .hide {
    height: 1px;
  }
  .el-row {
    transition-delay: .5s;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .aleft {
    text-align: left;
  }
</style>
